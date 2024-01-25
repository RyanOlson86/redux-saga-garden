import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeLatest , put } from 'redux-saga/effects'

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return action.payload
    default:
      return state;
  }
};

function* fetchGarden(action) {
  try {
    const gardenResponse = yield axios.get('/api/plants')
    yield put({type: 'ADD_PLANT', payload: gardenResponse.data})
  } catch(error) {
    console.log('Error in fetchGarden', error)
  }
}

function* postPlant(action) {
  try {
    yield axios.post('/api/plants', action.payload)
    yield put({type: 'FETCH_GARDEN'})
  } catch(error) {
    console.log('Error in postPlant', error)
  }
}

function* deletePlant(action) {
  try {
    yield axios.delete(`/api/plants/${action.payload}`)
    yield put({type: 'FETCH_GARDEN'})
  } catch(error) {
    console.log('Error in deletePlant', error)
  }
}

function* rootSaga() {
  yield takeLatest('FETCH_GARDEN', fetchGarden)
  yield takeLatest('POST_PLANT', postPlant)
  yield takeLatest('DELETE_PLANT', deletePlant)
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware,logger)
);

sagaMiddleware.run(rootSaga);

export default store;
