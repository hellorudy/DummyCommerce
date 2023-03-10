import {Await, defer, LoaderFunctionArgs, useLoaderData, useParams} from "react-router-dom";
import {ProductInterface, ProductsListInterface} from "../interfaces/Product";
import ProductListItem from "../components/ProductListItem";
import {Suspense} from "react";
import ProductsListLoader from "../components/ProductsListLoader";
import {getSingleCategory} from "../helpers/fetch";

const CategoryPage = () => {

   const {products} = useLoaderData() as ProductsListInterface
   const {category} = useParams()

   return (
      <>
         <h2 className="capitalize text-md ml-2 my-5">
            Products <br/>
            <span className="font-semibold text-blue-600 text-xl">in {category}</span>
         </h2>
         <main className="grid grid-cols-2 gap-10 px-3 mt-10">
            <Suspense fallback={<ProductsListLoader />}>
               <Await resolve={products}>
                  {(loadProducts: ProductInterface[]) => loadProducts.map((product) => (
                     <ProductListItem
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        category={product.category}
                        image={product.image}
                     />
                  ))}
               </Await>
            </Suspense>
         </main>
      </>
   )
}

export default CategoryPage

export const loader = async ({params}: LoaderFunctionArgs)  => {
   const products = getSingleCategory(params.category)
   return defer({products})
}