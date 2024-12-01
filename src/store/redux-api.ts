import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {resultGame_dto} from "../dto/result_games.dto";
import {ResponseType} from "axios";

export const testFrontApi = createApi({
    reducerPath: 'test_front',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.ohotaktiv.ru/api/v2/test_front/'}),
    endpoints: (builder) => ({
        getResultsGames: builder.query<resultGame_dto[], void>({
            query: () => '/',
            providesTags: ['Results']
        }),
        postResultGame: builder.mutation<ResponseType, resultGame_dto>({
            query: (values) => ({
                body: values,
                method: 'POST',
                url: '/'
            }),
            async onQueryStarted(newResult, {dispatch, queryFulfilled}) {
                try {
                    dispatch(testFrontApi.util.updateQueryData('getResultsGames', undefined, (draft: resultGame_dto[]) => {
                        draft.push(newResult)
                    }))
                } catch (err) {
                    console.log(err)
                }
            },
        })
    }),
    tagTypes: ['Results']
})

export const {useGetResultsGamesQuery, usePostResultGameMutation} = testFrontApi

