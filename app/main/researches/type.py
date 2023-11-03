from typing import Optional, Dict, List
from pydantic import BaseModel


class Suggestions(BaseModel):
    string: str
    volume: int
    m1: Optional[str]
    m1_month: Optional[str]
    m1_year: Optional[str]


class SearchSuggestionToolKeyResponse(BaseModel):
    results: Dict[str, List[Suggestions]]
    total_keywords: int


class SearchSuggestionResponse(BaseModel):
    string: str
    volume: int
