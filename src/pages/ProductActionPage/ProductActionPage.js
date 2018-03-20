import React, { Component } from 'react';
import callAPI from './../../utils/apiCaller';
import { Link } from 'react-router-dom';
class ProductActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName:'',
            txtPrice: '',
            chktStatus:''
        }
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value === "checkbox" ? target.checked : target.value;
        this.setState({
            [name] :value
        });
    }
    onSave = (e) =>{
        e.preventDefault(); // tranh load lai trang
        var {txtName,txtPrice,chktStatus} = this.state;
        var {history} = this.props;
        // console.log(this.state);

        callAPI('products','POST', {
            name: txtName,
            price: txtPrice,
            status: chktStatus
        }).then(res => {
            console.log(res);
            // history.goBack(); //Chuyen ve trang truoc do.
            history.push("/product-list") //Di chuyen toi trang nao do
        })
    }
    render() {
        var { txtName, txtPrice, chktStatus } = this.state;
        return (
        
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit = {this.onSave}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" 
                        className="form-control" 
                        name = "txtName"
                        value = {txtName}
                        onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number"
                            className="form-control"
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange}

                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>

                        <div className="checkbox">
                            <label>
                                <input type="checkbox" name = "chktStatus" 
                                    value={chktStatus}
                                    onChange={this.onChange}
                                /> Avaiable   </label>
                        </div>

                    </div>



                    <button type="submit" className="btn btn-primary">Save</button>
                    <Link to="/product-list" className="btn btn-danger ml-10" >
                        Back Product List
                    </Link>
                </form>
            </div>
        );
    }
}

export default ProductActionPage;

