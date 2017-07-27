/*
* @Author: Rosen
* @Date:   2017-04-04 20:03:01
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-05 23:32:40
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import MMUtile      from 'util/mm.jsx';
import Order        from 'service/order.jsx';

import './detail.scss';

const _mm           = new MMUtile();
const _order        = new Order();


const OrderDetail = React.createClass({
    getInitialState() {
        return {
            orderNumber: this.props.params.orderNumber,
            orderInfo : {}
        };
    },
    componentDidMount: function(){
        // 初始化产品
        this.loadOrderDetail();
    },
    // 加载detail信息
    loadOrderDetail(){
        _order.getOrderDetail(this.state.orderNumber).then(res => {
            this.setState({
                orderInfo: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    onSendGoods(){
        if(confirm('Confirm this order is on shipping')){
            _order.sendGoods(this.state.orderNumber).then(res => {
                this.loadOrderDetail();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    },
    render() {
        let productList     = this.state.orderInfo.orderItemVoList  || [],
            receiverInfo    = this.state.orderInfo.shippingVo       || {}
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="Order Details"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">OrderNo : </label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.orderInfo.orderNo}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">Create time : </label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.orderInfo.createTime}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">Receiver : </label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">
                                        {this.state.orderInfo.receiverName}，
                                        {receiverInfo.receiverProvince} 
                                        {receiverInfo.receiverCity}，
                                        {receiverInfo.receiverAddress}，
                                        {receiverInfo.receiverPhone}
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">Status :</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">
                                        {this.state.orderInfo.statusDesc}
                                        {
                                            this.state.orderInfo.status == 20 
                                                ? <a className="btn btn-sm btn-default btn-send-goods" onClick={this.onSendGoods}>Send</a>
                                                : null
                                        }   
                                        
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">Payment type :</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">Order price :</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">${this.state.orderInfo.payment}</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th width="15%">Images</th>
                                            <th width="40%">Info</th>
                                            <th width="15%">Unit price</th>
                                            <th width="15%">Quantity</th>
                                            <th width="15%">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productList.map((product, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img className="p-img" src={this.state.orderInfo.imageHost + product.productImage} alt={product.productName}/>
                                                        </td>
                                                        <td>{product.productName}</td>
                                                        <td>${product.currentUnitPrice}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>${product.totalPrice}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default OrderDetail;