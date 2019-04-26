import { all } from 'redux-saga/effects';
import { watchGetProductsSaga, watchGetProductSaga } from './productsSaga';
import {
  watchGetCategoriesSaga,
  watchGetCategorySaga,
  watchSearchByKeywordSaga,
  watchGetDepartmentsSaga
} from './categorySaga';
import { watchUserSignUpSaga, watchlogUserOutSaga, watchUserLoginSaga } from './authSaga';
import {
  watchAddProductToCart,
  watchGetCart,
  watchUpdateCartSaga,
  watchDeleteCartSaga,
  watchClearCartSaga
} from './cartSaga';
import { watchGetUserProfileSaga, watchUpdateUserProfileSaga, watchGetRegionsSaga } from './profileSaga';
import { watchGetCheckoutSaga, watchMakePaymentSaga, watchGetOrdersSaga } from './checkoutSaga';

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
    watchClearCartSaga(),
    watchGetUserProfileSaga(),
    watchUpdateUserProfileSaga(),
    watchGetRegionsSaga(),
    watchGetCheckoutSaga(),
    watchMakePaymentSaga(),
    watchGetOrdersSaga(),
    watchSearchByKeywordSaga(),
    watchGetDepartmentsSaga()
  ])
}

export default rootSaga;
