<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        //return Survey::where('user_id', $user->id)->paginate();
        return SurveyResource::collection(
            Survey::where('user_id', $user->id)
                ->paginate(3)
                //->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        $success = true;
        try{
            // save image
            if (isset($data['image'])){
                $relativePath = $this->saveImage($data['image']);
                $data['image'] = $relativePath;
            }

            $survey = Survey::create($data);

            // Create new questions
            foreach ($data['questions'] as $question){
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }catch (Exception $e){
            $success = false;
            // todo: log
        }

        $survey->success = $success;
        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id){
            return response([
                '$user_id' => $user->id,
                '$survey->user_id' => $survey->user_id
            ]);
            return abort(403, 'Unathorized action.');
        }

        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function showForGuest(Survey $survey, Request $request)
    {
        $survey->success = true;

        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        $success = true;

        if (isset($data['image'])){
            // save image
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            // delete old image
            if ($survey->image){
                $absolutePath = public_path($survey->image);
                try{
                    File::delete($absolutePath);
                }catch (Exception $e){
                    $success = false;
                    // todo: log
                }
            }
        }

        try{
            $survey->update($data);
        }catch (Exception $e){
            $success = false;
            // todo: log
        }

        // Create new questions for update survey
        // сделаю очень просто, сначала удалю все вопросы у survey
        // потом просто добавлю все прилетевшие новые вопросы
        try{
            SurveyQuestion::where('survey_id', '=', $survey->id)
                ->delete();

            foreach ($data['questions'] as $question){
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }catch (Exception $e){
            $success = false;
            // todo: log
        }

        $survey->success = $success;
        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        // todo: поставить политики после!
        if ($user->id !== $survey->user_id){
            return abort(403, 'Unathorized action.');
        }

        $result['success'] = true;
        try{
            $survey->delete();

            // delete old image
            if ($survey->image){
                $absolutePath = public_path($survey->image);
                try{
                    File::delete($absolutePath);
                }catch (Exception $e){
                    throw new \Exception('file delete failing!');
                }
            }
        }catch (Exception $e){
            //throw new \Exception('file delete failing!');
            $result['success'] = false;
        }

        return response($result);
    }

    /** todo: исправить этот глупый метод */
    private function saveImage($image)
    {
        //
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)){
            $image = substr($image, strpos($image, ',') + 1);
            $type = strtolower($type[1]);
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png', 'webp'])){
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false){
                throw new \Exception('base64_decode failed');
            }
        }else{
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }
        try{
            file_put_contents($relativePath, $image);
        }catch (Exception $e){
            throw new \Exception('file saving failing!');
        }

        return $relativePath;
    }

    /**
     * Создает вопросы для опроса, т.е. назвать нужно было createQuestions
     * @param mixed $data
     * @return SurveyQuestion
     */
    private function createQuestion(mixed $data)
    {
        if (is_array($data['data'])){
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data, [
            'question' => 'required|string',
            'type' => ['required', Rule::in([
                Survey::TYPE_TEXT    ,
                Survey::TYPE_CHECKBOX,
                Survey::TYPE_SELECT  ,
                Survey::TYPE_RADIO   ,
                Survey::TYPE_TEXTAREA,
            ])],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id',
        ]);

        return SurveyQuestion::create($validator->validated());
    }
}
