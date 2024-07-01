import Brand from "../src/app/views/brand/brand";
import Category from "../src/app/views/category/category";
import Client from "../src/app/views/client/client";
import Collaborator from "../src/app/views/colaborator/collaborator";
import Collection from "../src/app/views/collection/collection";
import EditBrand from "../src/app/views/editers/editBrand";
import EditCategory from "../src/app/views/editers/editCategory";
import EditClient from "../src/app/views/editers/editClient";
import EditCollaborator from "../src/app/views/editers/editCollaborator";
import EditCollection from "../src/app/views/editers/editCollection";
import EditIndication from "../src/app/views/editers/editIndication";
import EditProduct from "../src/app/views/editers/editProduct";
import EditSupplier from "../src/app/views/editers/editSupplier";
import Indication from "../src/app/views/indication/indication";
import ForgotPassword from "../src/app/views/login/forgotPassword/ForgotPassword";
import Login from "../src/app/views/login/login";
import RedefinePassword from "../src/app/views/login/redefinePassword/redefinePassword";
import Product from "../src/app/views/product/product";
import RegisterBrand from "../src/app/views/registers/registerBrand";
import RegisterCategory from "../src/app/views/registers/registerCategory";
import RegisterClient from "../src/app/views/registers/registerClient";
import RegisterCollaborator from "../src/app/views/registers/registerCollaborator";
import RegisterCollection from "../src/app/views/registers/registerCollection";
import RegisterIndication from "../src/app/views/registers/registerIndication";
import RegisterSupplier from "../src/app/views/registers/registerSupplier";
import { Sale } from "../src/app/views/sale/sale";
import Supplier from "../src/app/views/supplier/supplier";
import DefaultRoute from "../src/core/utils/defaultRoute";
import ProtectedRoute from "../src/core/utils/protectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<DefaultRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/esqueceuSenha" element={<ForgotPassword />} />
      <Route path="/recuperacao-senha" element={<RedefinePassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/clientes" element={<Client />} />
        <Route path="/registrarCliente" element={<RegisterClient />} />
        <Route path="/editarCliente" element={<EditClient />} />

        <Route path="/fornecedores" element={<Supplier />} />
        <Route path="/registrarFornecedor" element={<RegisterSupplier />} />
        <Route path="/editarFornecedor" element={<EditSupplier />} />

        <Route path="/indicacoes" element={<Indication />} />
        <Route path="/registrarIndicacao" element={<RegisterIndication />} />
        <Route path="/editarIndicacao" element={<EditIndication />} />

        <Route path="/categorias" element={<Category />} />
        <Route path="/registrarCategoria" element={<RegisterCategory />} />
        <Route path="/editarCategoria" element={<EditCategory />} />

        <Route path="/marcas" element={<Brand />} />
        <Route path="/registrarMarca" element={<RegisterBrand />} />
        <Route path="/editarMarca" element={<EditBrand />} />

        <Route path="/colecoes" element={<Collection />} />
        <Route path="/registrarColecao" element={<RegisterCollection />} />
        <Route path="/editarColecao" element={<EditCollection />} />

        <Route path="/produtos" element={<Product />} />
        <Route path="/editarProduto" element={<EditProduct />} />

        <Route path="/colaboradores" element={<Collaborator />} />
        <Route
          path="/registrarColaborador"
          element={<RegisterCollaborator />}
        />
        <Route path="/editarColaborador" element={<EditCollaborator />} />

        <Route path="/venda" element={<Sale />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default Router;
