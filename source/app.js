var React = require('react');
var ReactDOM = require('react-dom');

var axios = require("axios");
var axiosDefaults = require("axios/lib/defaults");

var DjangoCSRFToken = require('django-react-csrftoken')

var ControlledInput = React.createClass({
  getInitialState: function() {
    return {
      name: "",
      surname: ""
    };
  },

  handleChange: function(evt) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  },
  handleChange2: function(evt) {
    this.setState({
      surname: evt.target.value,
    });
  },

  reset: function() {
    this.setState({
      name: "",
      surname: "",
    });
  },

  SchovatUzivatele: function() {
        ReactDOM.render(<ul></ul>, document.getElementById('react-application'));
  },

  alertValue: function() {
    alert(this.state.value);
  },
  UlozUzivatele : function () {
  //console.log(DjangoCSRFToken);
  var _self = this;
  return new Promise((resolve, reject) => {

          axios({
             method: 'post',
             url: 'http://localhost:60538/users/',
             data: {
               first_name: this.state.name,
               last_name:  this.state.surname,
             },
             headers: {
               'content-type' : 'application/json'
             },


           })

           .then(function (response) {
                _self.ZobrazUzivatele();
                _self.reset();
                //console.log(response.data);
              //  console.log(response.status);
              //  console.log(response.statusText);
              //  console.log(response.headers);
              //  console.log(response.config);
           })
           .catch(function (error) {
                console.log(error);
           });
      });
  },

  render: function() {
    //this.ZobrazUzivatele();
    return (
      <div>
        <SubComponent />
        <input name="name" placeholder="Jmeno" value={this.state.name} onChange={this.handleChange} />
        <input name="surname"  placeholder="Prijmeni" value={this.state.surname} onChange={this.handleChange} />
        <br />
        <button className="btn btn-default"  onClick={this.reset}>Reset vstupnich poli</button>
        <button className="btn btn-default" onClick={this.UlozUzivatele}>Uloz uzivatele</button>
        <button className="btn btn-default" onClick={this.ZobrazUzivatele}>Zobraz uzivatele</button>
        <button className="btn btn-default" onClick={this.SchovatUzivatele}>Schovat uzivatele</button>
      </div>
    );
  }
});

var SubComponent = React.createClass({
  getInitialState: function() {
    return {
      uzivatele: "",
    };
  },
  ZobrazUzivatele : function () {
  //console.log(DjangoCSRFToken);
  return new Promise((resolve, reject) => {

          axios({
             method: 'get',
             url: 'http://localhost:60538/users/',
             headers: {
               'content-type' : 'application/json'
             },
           })

           .then(function (response) {
              //  console.log(response.data);
  /*
                var SubComponent = React.createClass({
                  render: function(){
                    return (
                      <ul>
                      </ul>
                    )
                  }
                })
                //ReactDOM.render(<SubComponent name="Uzivatele" />, document.getElementById('react-application'));
  */

                var uzivatele3 = [];
                for (var i = response.data.length-10; i < response.data.length; i++) {
                  if (response.data[i].first_name!=null) {
                      if (i==(response.data.length-1)) {
                      uzivatele3.push(<li className="posledni_zapis" key={response.data[i].id}>Jmeno: {response.data[i].first_name} Prijmeni: {response.data[i].last_name}</li>);
                      } else {
                        uzivatele3.push(<li  key={response.data[i].id}>Jmeno: {response.data[i].first_name} Prijmeni: {response.data[i].last_name}</li>);
                      }
                      //console.log(response.data[i].first_name);
                  }
                };

                this.uzivatele = uzivatele3;
                //console.log(this.uzivatele);
                //return (uzivatele);
                //ReactDOM.render(<ul>{uzivatele}</ul>, document.getElementById('react-application'));
           })
           .catch(function (error) {
                console.log(error);
           });
      });
  },
  render: function(){
    this.ZobrazUzivatele();
    var uzivatele2 =[];
    return (
      <div>
        {uzivatele2}
      </div>
    )
  }
})

//var reactComponentElement = React.createElement(ControlledInput.ZobrazUzivatele);
var reactComponentElement = React.createElement(ControlledInput);
//var reactComponent = ReactDOM.render( reactComponentElement, document.getElementById('react-application'));
var reactComponent = ReactDOM.render( reactComponentElement, document.getElementById('react-application'));
