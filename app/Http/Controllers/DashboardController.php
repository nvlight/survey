<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyResourceDashboard;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Total number of surveys
        $total = Survey::where('user_id', $user->id)->count();

        // Latest survey
        $lastSurvey = Survey::where('user_id', $user->id)
            ->orderBy('id', 'DESC')
            ->first();

        // Total number of answers
        $totalAnswers = SurveyAnswer::
              join('surveys', 'surveys.id', '=', 'survey_answers.survey_id')
            ->where('surveys.user_id', $user->id)
            ->count();

        // Latest 5 answer
        $latestFiveAnswers = SurveyAnswer::
              join('surveys', 'surveys.id', '=', 'survey_answers.survey_id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('survey_answers.*');

        return response([
            'user' => ['name' => $user->name, 'email' => $user->email],
            'success' => true,
            'totalSurveys' => $total,
            'lastSurvey' => $lastSurvey ? new SurveyResourceDashboard($lastSurvey) : null,
            'totalAnswers' => $totalAnswers,
            'latestFiveAnswers' => SurveyAnswerResource::collection($latestFiveAnswers),
        ]);
    }
}
