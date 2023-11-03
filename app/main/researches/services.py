import os
from .dto import searchSuggestions
from .type import SearchSuggestionToolKeyResponse, Suggestions
from typing import List


class SearchSuggestionService:
    def __init__(self):
        keyword_tool_api_key = os.getenv("KEYWORD_TOOL_API_KEY", "")
        self.__url = (
            "https://api.keywordtool.io/v2/search/suggestions/google?apikey={}".format(
                keyword_tool_api_key
            )
        )

    def search_suggestions(
        self, keyword: str
    ) -> searchSuggestions.SearchSuggestionsResponse:
        json = self.__request_search_suggestion_tool_key(keyword)
        suggestions = self.__all_suggestions(json)

        top80 = self.__pickTop80(suggestions, keyword)
        response = self.__convertToResponse(top80)

        return response

    @property
    def url(self):
        return self.__url

    def __request_search_suggestion_tool_key(
        self, keyword: str
    ) -> SearchSuggestionToolKeyResponse:
        dict = SearchSuggestionToolKeyResponse(
            results={
                "string": [
                    Suggestions(
                        string=f"{keyword}関連: {keyword}",
                        volume=100,
                        m1=None,
                        m1_month=None,
                        m1_year=None,
                    )
                ]
            },
            total_keywords=1,
        )
        return dict

    def __all_suggestions(
        self, json: SearchSuggestionToolKeyResponse
    ) -> List[Suggestions]:
        suggestions: List[Suggestions] = []
        for key in json.results:
            suggestions.extend(json.results[key] if json.results[key] else [])
        return suggestions

    def __pickTop80(
        self, suggestions: List[Suggestions], keyword: str
    ) -> List[Suggestions]:
        sorted_suggestions = sorted(suggestions, key=lambda s: s.volume, reverse=True)
        unique_suggestions: List[Suggestions] = []
        for i in range(len(sorted_suggestions)):
            if not any(
                s.string == sorted_suggestions[i].string for s in unique_suggestions
            ):
                unique_suggestions.append(sorted_suggestions[i])

        unique_suggestions_exclude_keyword = [
            s for s in unique_suggestions if s.string != keyword
        ]

        return unique_suggestions_exclude_keyword[:80]

    def __convertToResponse(
        self, suggestions: List[Suggestions]
    ) -> searchSuggestions.SearchSuggestionsResponse:
        return searchSuggestions.SearchSuggestionsResponse(
            message=[
                searchSuggestions.SearchSuggestionDto(
                    string=suggestion.string, volume=suggestion.volume
                )
                for suggestion in suggestions
            ]
        )
