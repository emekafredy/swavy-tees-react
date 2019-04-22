import { all } from 'redux-saga/effects';
import { watchGetProductsSaga, watchGetProductSaga } from './productsSaga';
import { watchGetCategoriesSaga, watchGetCategorySaga } from './categorySaga';
import { watchUserSignUpSaga, watchlogUserOutSaga, watchUserLoginSaga } from './authSaga';
import {
  watchAddProductToCart,
  watchGetCart,
  watchUpdateCartSaga,
  watchDeleteCartSaga,
  watchClearCartSaga
} from './cartSaga';

function* rootSaga() {
  yield all([
    watchGetProductsSaga(),
    watchGetCategoriesSaga(),
    watchGetCategorySaga(),
    watchGetProductSaga(),
    watchUserSignUpSaga(),
    watchlogUserOutSaga(),
    watchUserLoginSaga(),
    watchAddProductToCart(),
    watchGetCart(),
    watchUpdateCartSaga(),
    watchDeleteCartSaga(),
    watchClearCartSaga()
  ])
}

export default rootSaga;
