/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * tsoa-example
 * OpenAPI spec version: 1.0.0
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import {
  useQuery
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey
} from '@tanstack/react-query'
import type {
  IGetWeatherReportResult,
  GetWeatherReportParams
} from './schemas'



/**
 * Retrieves the details of an existing template
 */
export const getWeatherReport = (
    params: GetWeatherReportParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<IGetWeatherReportResult>> => {
    
    return axios.get(
      `/generate`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getGetWeatherReportQueryKey = (params: GetWeatherReportParams,) => {
    
    return [`/generate`, ...(params ? [params]: [])] as const;
    }
  

    
export const getGetWeatherReportQueryOptions = <TData = Awaited<ReturnType<typeof getWeatherReport>>, TError = AxiosError<unknown>>(params: GetWeatherReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getWeatherReport>>, TError, TData>, axios?: AxiosRequestConfig}
) => {
    
const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetWeatherReportQueryKey(params);

  
  
    const queryFn: QueryFunction<Awaited<ReturnType<typeof getWeatherReport>>> = ({ signal }) => getWeatherReport(params, { signal, ...axiosOptions });

      
    
      
      
   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getWeatherReport>>, TError, TData> & { queryKey: QueryKey }
}

export type GetWeatherReportQueryResult = NonNullable<Awaited<ReturnType<typeof getWeatherReport>>>
export type GetWeatherReportQueryError = AxiosError<unknown>

export const useGetWeatherReport = <TData = Awaited<ReturnType<typeof getWeatherReport>>, TError = AxiosError<unknown>>(
 params: GetWeatherReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getWeatherReport>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetWeatherReportQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}


