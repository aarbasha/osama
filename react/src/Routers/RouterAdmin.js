import Dashborde from "../components/admin/Dashborde";
import Index2 from "../components/admin/Index2";
import Index3 from "../components/admin/Index3";
import Index4 from "../components/admin/Index4";
//Users
import MasterUsers from "../components/admin/Users/MasterUsers";
import Users from "../components/admin/Users/Users";
import Add_Users from "../components/admin/Users/Add_Users";
import Users_Profiles from "../components/admin/Users/Users_Profiles";
import Edit_Users from "../components/admin/Users/Edit_Users";
import AdminProfile from "../components/admin/AdminProfile";
//Categories
import MasterCategories from "../components/admin/Categories/MasterCategories";
import AddSubCategories from "../components/admin/Categories/AddSubCategories";
import AllCategories from "../components/admin/Categories/AllCategories";
import AddCategories from "../components/admin/Categories/AddCategories";
import EditCategories from "../components/admin/Categories/EditCategories";
//Products
import MasterProducts from "../components/admin/Products/MasterProducts";
import AddProducts from "../components/admin/Products/AddProducts";
import EditProducts from "../components/admin/Products/EditProducts";
import AllProducts from "../components/admin/Products/AllProducts";
import SingleProduct from "../components/admin/Products/SingleProduct";
import ProductsGrid from "../components/admin/Products/ProductsGrid";
//Permissions
import Master_Permissions from "../components/admin/Permissions/Master_Permissions";
import All_Permissions from "../components/admin/Permissions/All_Permissions";
import Add_Permissions from "../components/admin/Permissions/Add_Permissions";
import Edit_Permissions from "../components/admin/Permissions/Edit_Permissions";
//Roles
import Master_Roles from "../components/admin/Roles/Master_Roles";
import All_Roles from "../components/admin/Roles/All_Roles";
import Add_Roles from "../components/admin/Roles/Add_Roles";
import Edit_Roles from "../components/admin/Roles/Edit_Roles";

//posts
import MasterPosts from "../components/admin/Posts/MasterPosts";
import AllPosts from "../components/admin/Posts/AllPosts";
import EditPosts from "../components/admin/Posts/EditPosts";
import AddPosts from "../components/admin/Posts/AddPosts";
import ShowPosts from "../components/admin/Posts/ShowPosts";
import Users_online from "../components/admin/Users/Users_online";

//orders
import MasterOrder from "../components/admin/Orders/MasterOrder";
import AllOrder from "../components/admin/Orders/AllOrder";
import AddOrder from "../components/admin/Orders/AddOrder";
import EditOrder from "../components/admin/Orders/EditOrder";
import ShowOrder from "../components/admin/Orders/ShowOrder";

//Tasks
import MasterTasks from "../components/admin/Tasks/MasterTasks";
import AllTasks from "../components/admin/Tasks/AllTasks";
import AddTasks from "../components/admin/Tasks/AddTasks";
import EditTasks from "../components/admin/Tasks/EditTasks";
import ShowTasks from "../components/admin/Tasks/ShowTasks";
import MasterBehance from "../components/admin/Behance/MasterBehance";
import AllBehance from "../components/admin/Behance/AllBehance";
import EditBehance from "../components/admin/Behance/EditBehance";
import AddBehance from "../components/admin/Behance/AddBehance";

export const RouterAdmin = () => {
  return [
    {
      path: "index",
      element: <Index2 />,
    },
    {
      path: "app",
      element: <Dashborde />,
    },
    {
      path: "app2",
      element: <Index3 />,
    },
    {
      path: "app3",
      element: <Index4 />,
    },
    {
      path: "myProfile",
      element: <AdminProfile />,
    },

    {
      path: "users",
      element: <MasterUsers />,
      children: [
        {
          path: "all_users",
          element: <Users />,
        },
        {
          path: "user_online",
          element: <Users_online />,
        },
        {
          path: "add_users",
          element: <Add_Users />,
        },
        {
          path: "users_profiles/:id",
          element: <Users_Profiles />,
        },
        {
          path: "edit_users/:id",
          element: <Edit_Users />,
        },
      ],
    },

    {
      path: "permissions",
      element: <Master_Permissions />,
      children: [
        {
          path: "all_permissions",
          element: <All_Permissions />,
        },
        {
          path: "add_permissions",
          element: <Add_Permissions />,
        },
        {
          path: "edit_permissions/:id",
          element: <Edit_Permissions />,
        },
      ],
    },

    {
      path: "roles",
      element: <Master_Roles />,
      children: [
        {
          path: "all_roles",
          element: <All_Roles />,
        },
        {
          path: "add_roles",
          element: <Add_Roles />,
        },
        {
          path: "edit_roles/:id",
          element: <Edit_Roles />,
        },
      ],
    },

    {
      path: "categories",
      element: <MasterCategories />,
      children: [
        {
          path: `all_categories`,
          element: <AllCategories />,
        },
        {
          path: "add_categories",
          element: <AddCategories />,
        },
        {
          path: "sub_categories",
          element: <AddSubCategories />,
        },
        {
          path: "edit_categories/:id",
          element: <EditCategories />,
        },
        {
          path: "productsGrid/:id",
          element: <ProductsGrid />,
        },
      ],
    },

    {
      path: "products",
      element: <MasterProducts />,
      children: [
        {
          path: "all_products",
          element: <AllProducts />,
        },
        {
          path: "single_products/:id",
          element: <SingleProduct />,
        },
        {
          path: "add_products",
          element: <AddProducts />,
        },
        {
          path: "edit_products/:id",
          element: <EditProducts />,
        },
      ],
    },

    {
      path: "posts",
      element: <MasterPosts />,
      children: [
        {
          path: "all_posts",
          element: <AllPosts />,
        },
        {
          path: "add_posts",
          element: <AddPosts />,
        },
        {
          path: "edit_posts/:id",
          element: <EditPosts />,
        },
        {
          path: "show_posts/:id",
          element: <ShowPosts />,
        },
      ],
    },

    {
      path: "orders",
      element: <MasterOrder />,
      children: [
        {
          path: "all_orders",
          element: <AllOrder />,
        },
        {
          path: "add_orders",
          element: <AddOrder />,
        },
        {
          path: "edit_orders/:id",
          element: <EditCategories />,
        },
        {
          path: "show_orders/:id",
          element: <ShowOrder />,
        },
      ],
    },

    {
      path: "tasks",
      element: <MasterTasks />,
      children: [
        {
          path: "all_tasks",
          element: <AllTasks />,
        },
        {
          path: "add_tasks",
          element: <AddTasks />,
        },
        {
          path: "edit_tasks/:id",
          element: <EditTasks />,
        },
        {
          path: "show_tasks/:id",
          element: <ShowTasks />,
        },
      ],
    },

    {
      path: "postBehance",
      element: <MasterBehance />,
      children: [
        {
          path: "all_post_behance",
          element: <AllBehance />,
        },
        {
          path: "add_post_behance",
          element: <AddBehance />,
        },
        {
          path: "edit_post_behance/:id",
          element: <EditBehance />,
        },
      ],
    },
  ];
};
