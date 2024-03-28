import { Routes, Route } from 'react-router-dom';
import './App.css';
// import { loadStripe } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js'

import PageNotFound from './Components/PageNotFound';
import House from './Components/House';
import Header from './Components/Header';
import ListAHouse from './Components/ListAHouse';
import Login from './Components/Login';
import SearchHouse from './Components/SearchHouse';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Enquiries from './Components/Enquiries';
import SearchResults from './Components/SearchResults';
import SearchFilter from './Components/SearchFilter';
import SearchResultsRow from './Components/SearchResultsRow';
import PaymentGateway from './Components/PaymentGateway';

const stripePromise = loadStripe('pk_test_51OyWJxSAZ9k8UIedsBqWRhbnPKpwL8CS65PYvSELYYwYvA2XPkuSJdfm6IsTaoLsL5QN6CQA44achEKCrJU8pRei00Z968M4XS');

function App() {
  return (
    <div className="App">
      <Header/>
      
          <Routes>
            {/* <Route path='/' element={<Home/>}/>
            <Route path="*" element={<PageNotFound/>}/>
            <Route path="/house/:id" element={<House/>}/>
            <Route path="/listahouse" element={<ListAHouse/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/searchhouse/:id' element={<SearchHouse/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/enquiries" element={<Enquiries/>}/>
            <Route path="/searchresults/:locality/:bhk" element={<SearchResults/>}/>
            <Route path="/search" element={<SearchFilter/>}/>
            <Route path="/searchresultsrow" element={<SearchResultsRow/>}/> */}
              <Route path='/' element={<Home/>}/>
              {/* <Route path="*" element={<PageNotFound/>} />  */}
              <Route path='/house/:id' element={<House/>}/>
              <Route path="listahouse" element={<ListAHouse/>} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/searchhouse/:id' element={<SearchHouse/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/enquiries' element={<Enquiries/>}/>
              <Route path='/search' element={<SearchFilter/>}/> 
              <Route path='/searchresults/:locality/:bhk' element={<SearchResults/>}/> 
              <Route path="/searchresultsrow" element={<SearchResultsRow/>}/>
              
          
          </Routes>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/pg" element={<PaymentGateway/>} /> 
              {/* <Route path="*" element={<PageNotFound/>} />  */}
            </Routes>
          </Elements>
        
    
      
      
        
    </div>
  );
}

export default App;
