from pydantic import BaseModel
from typing import List


class SearchSuggestionBodyDto(BaseModel):
    keyword: str


class SearchSuggestionDto(BaseModel):
    string: str
    volume: int


class SearchSuggestionsResponse(BaseModel):
    message: List[SearchSuggestionDto]
