<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use Nette\Utils\DateTime;

class AnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'image_url' => $this->image ? URL::to($this->image) : null,
            'slug' => $this->slug,
            'status' => $this->status ? 'active' : 'draft',

            'expire_date' => (new DateTime($this->expire_date))->format('Y-m-d H:i:s'),
            'start_date' => (new DateTime($this->start_date))->format('Y-m-d H:i:s'),
            'end_date' => (new DateTime($this->end_date))->format('Y-m-d H:i:s'),

            'answer' => strpos($this->answer, '[') !== false
                        ? json_decode($this->answer)
                        : $this->answer,
            'answer_is' => strpos($this->answer, '[') !== false
                        ? 'array' : 'string',
            'survey_questions_type' => $this->type,
            'survey_questions_question' => $this->question,
            'survey_questions_description' => $this->description,
        ];
    }
}
