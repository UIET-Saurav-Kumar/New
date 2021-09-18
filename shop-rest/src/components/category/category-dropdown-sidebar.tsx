
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import SidebarMenu from "@components/ui/sidebar-menu";
import Scrollbar from "@components/ui/scrollbar";
import CategoryListLoader from "@components/ui/loaders/category-loader";
import NotFound from "@components/common/not-found";
import { useCategoriesQuery } from "@data/category/use-categories.query";


const CategoryDropdownSidebar = () => {
  const { query } = useRouter();
  const { type } = query;
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: query.slug as string,
  });


  if (loading) {
    return (
      <div className="block">
        <div className="w-60 mt-8 px-2">
          <CategoryListLoader />
        </div>
      </div>
    );
  }
  if (error) return <ErrorMessage message={error.message} />;

  
  return (
    <aside className="sticky w-72 top-22 h-full lg:w-64   bg-light">
      <div className="max-h-full overflow-hidden">
        <Scrollbar className="w-full h-full max-h-screen">
          {data?.categories?.data?.length ? (
            <div className="px-5 h-96">
              <SidebarMenu items={data?.categories?.data} className="py-8" />
            </div>
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
             
            </div>
          )}
        </Scrollbar>
      </div>
    </aside>
    
  );
};

export default CategoryDropdownSidebar;
