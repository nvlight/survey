<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use Nette\Utils\DateTime;

class SurveyResourceDashboard extends JsonResource
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
            'success' => $this->success,
            'id' => $this->id,
            'title' => $this->title,
            'image_url' => $this->image ? URL::to($this->image) : null,
            'slug' => $this->slug,
            'status' => $this->status ? 'active' : 'draft',
            'created_at' => (new DateTime($this->created_at))->format('Y-m-d H:i:s'),
            'updated_at' => (new DateTime($this->updated_at))->format('Y-m-d H:i:s'),
            'expire_date' => $this->expire_date,
            'questions' => $this->questions()->count(),
            'answers' => $this->answers()->count(),
        ];
    }
}
