from .dto import searchSuggestions
from fastapi import APIRouter, Depends
from typing import Annotated
from .services import SearchSuggestionService
from app.core.log.logger import logger

router = APIRouter()


@router.post(
    "/search-suggestions",
    response_model=searchSuggestions.SearchSuggestionsResponse,
)
def search_suggestions(
    search_suggestion_service: Annotated[
        SearchSuggestionService, Depends(SearchSuggestionService)
    ],
    search_suggestion_body_dto: searchSuggestions.SearchSuggestionBodyDto,
) -> searchSuggestions.SearchSuggestionsResponse:
    logger.info(
        "search_suggestions: search_suggestion_body_dto.keyword = %s",
        search_suggestion_body_dto.keyword,
    )
    return search_suggestion_service.search_suggestions(
        search_suggestion_body_dto.keyword
    )
