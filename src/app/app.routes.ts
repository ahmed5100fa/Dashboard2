import { Routes } from '@angular/router';
import { Dashboard } from './features/pages/dashboard/dashboard';
import { ProductList } from './features/pages/products/product-list/product-list';
import { ProductDetails } from './features/pages/products/product-details/product-details';
import { NotFound } from './shared/components/not-found/not-found';
import { productExistsGuard } from './core/guards/product-exists-guard';

export const routes: Routes = [
{path :"" , redirectTo :"dashboard" , pathMatch : 'full'},
{path :"dashboard" , component : Dashboard  , title : "Dashboard"},
{path :"products" , component : ProductList , title : "Products"},
{path :"products/:id" , component : ProductDetails , title: "Product Details", canActivate : [productExistsGuard]},
{path :"**" , component : NotFound , title: "notfound"}
];
