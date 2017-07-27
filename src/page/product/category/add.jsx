/*
* @Author: Rosen
* @Date:   2017-02-15 20:34:22
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-04 19:46:28
*/
'use strict';

import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import Product      from 'service/product.jsx'

const _product = new Product();

const ProductCategoryAdd = React.createClass({
    getInitialState() {
        return {
            pageName        : 'Parent category',
            parentId        : 0,  // 所属品类
            categoryName    : '', // 品类名称
            categoryList    : []  // 品类集合
        };
    },
    componentDidMount: function(){
        // 查询一级品类时，不传id
        _product.getCategory().then(res => {
            this.setState({
                categoryList: res
            });
        }, errMsg => {
            alert(errMsg);
        });
    },
    onValueChange(e){
        let name   = e.target.name;
        this.setState({
            [name] : e.target.value
        });
    },
    onSubmit(e){
        e.preventDefault();
        if(!this.state.categoryName){
            alert('Please enter product name');
            return;
        }
        // 请求接口
        _product.saveCategory({
            parentId      : this.state.parentId,
            categoryName    : this.state.categoryName
        }).then(res => {
            alert('Succeed to add new category');
            window.location.href='#/product.category/index';
        }, errMsg => {
            alert(errMsg);
        });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="Category management -- add new category"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <form className="form-horizontal" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="col-md-2 control-label">{this.state.pageName}</label>
                                <div className="col-md-10">
                                    <select className="form-control cate-select" name="parentId" onChange={this.onValueChange}>
                                        <option value="0">/All</option>
                                        {
                                            this.state.categoryList.map(function(category, index) {
                                                return (
                                                    <option value={category.id} key={index}>/All/{category.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category-name" className="col-md-2 control-label">Category name</label>
                                <div className="col-md-3">
                                    <input type="text" 
                                        className="form-control" 
                                        id="category-name" 
                                        name="categoryName"
                                        autoComplete="off"
                                        placeholder="Please enter category name"
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-xl btn-primary">Submit</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

export default ProductCategoryAdd;