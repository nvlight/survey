<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnswerResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestionAnswer;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return AnswerResource::collection(
            Survey::where('user_id', $user->id)
            ->join('survey_answers', 'survey_answers.survey_id', '=', 'surveys.id')
            ->select('surveys.title', 'surveys.slug','surveys.image', 'surveys.status','surveys.expire_date' ,
                'survey_answers.start_date','survey_answers.end_date','survey_answers.id'
                )
            //->toSql()
            ->paginate(5)
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id, Request $request)
    {
        $user = $request->user();

        $query = Survey::where('user_id', $user->id)
            ->join('survey_answers', 'survey_answers.survey_id', '=', 'surveys.id')
            ->join('survey_question_answers', 'survey_answer_id', '=', 'survey_answers.id')
            ->join('survey_questions', 'survey_questions.id', '=', 'survey_question_answers.survey_question_id')
            ->select('surveys.title', 'surveys.slug','surveys.image', 'surveys.status','surveys.expire_date' ,
                'survey_answers.start_date','survey_answers.end_date','survey_answers.id',
                'survey_question_answers.answer',
                'survey_questions.type', 'survey_questions.question', 'survey_questions.description',
            )
            ->where('survey_answer_id', $id)

                //->toSql()
                //->paginate(5)
                //->get()
        ;
        return response([
            'success' => true,
            'query' => $query->toSql(),
            'data' => AnswerResource::collection($query->get()),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(SurveyAnswer $answer)
    {
        $success = true;
        try {
            SurveyQuestionAnswer::where('survey_answer_id','=', $answer->id)->delete();
            $answer->delete();
        }catch (QueryException $e){
            // todo: log
            $success = false;
        }

        return response([
            'success' => $success,
        ]);
    }
}
