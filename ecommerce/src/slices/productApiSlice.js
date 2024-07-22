import { PRODUCTS_URL, UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({  
    endpoints: (builder) => ({ 
        getProducts: builder.query({
            query: ({keyword,pageNumber}) => ({
                url: PRODUCTS_URL,
                params:{  
                    keyword,
                    pageNumber,
                      },
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5, // note: seconds
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
          
        }),

        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags:['Product'],
        }),

        updateProduct: builder.mutation({
            query: ( data ) => ({
                url: `${PRODUCTS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),    
            invalidatesTags: ['Product'],
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
        }),

       
       

        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
    
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
getTopProducts: builder.query({
    query: () => ({
        url: `${PRODUCTS_URL}/top`,
    })
})
    
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUploadProductImageMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
} = productsApiSlice;
