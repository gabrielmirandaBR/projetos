import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import { fetchCountries } from './services/countries';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCountries: [],
      countries: [],
      value: "",
    }

    this.getCountries = this.getCountries.bind(this);
    this.handleOnchange = this.handleOnchange.bind(this);

  }

  componentDidMount(){
    this.getCountries();
  }
  
  async getCountries() {
    const countries = await fetchCountries();
    this.setState({
      countries: countries,
      allCountries: countries,
    });
  }

  handleOnchange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    },
    () => {
      const { allCountries } = this.state;

      value ? 
      this.setState({
        countries: allCountries.filter(({ translations: { br } }) => br.includes(value)),
      })
      :
      this.setState({
        countries: allCountries,
      });
    });
  }
  
  render() {
    const { countries, value } = this.state;
    return (
      <BrowserRouter>
        <main>
          <Header />
            
              <Switch>
                <Route exact path="/" render={() => <CountriesList countries={ countries } value={value} handleOnchange={this.handleOnchange} />}/>
                <Route path="/countries/:country" render={(props) => <CountryDetails {...props} countries={ countries } />}/>
              </Switch>
            
        </main>
      </BrowserRouter>
    )
  }
}

export default App;
