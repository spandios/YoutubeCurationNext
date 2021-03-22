import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultLastPageMetadata, DefaultState } from '../common/CommonInterface'
import { getAccessToken } from '../service/TokenService'
type CommonState = {
  isLogin: boolean
} & DefaultState

const initCommonState: CommonState = {
  isLoading: false,
  error: null,
  isLogin: getAccessToken() != null,
}

function loadingFailed(state: CommonState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

export const common = createSlice({
  name: 'common',
  initialState: initCommonState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },
    stopLoading(state) {
      state.isLoading = false
    },
    setIsLogin(state, { payload: flag }) {
      state.isLogin = flag
    },
  },
})

export const { startLoading, setIsLogin, stopLoading } = common.actions
export default common.reducer

// export const fetchOrders = (): AppThunk => async dispatch => {
//   try {
//     dispatch(startLoading());
//     const orders = await getOrders();
//     dispatch(getOrdersSuccess(orders));
//   } catch (e) {
//     dispatch(getOrdersFail(e.toString()));
//   }
// };
//
// export const fetchOrder = (no: number): AppThunk => async (dispatch, getState) => {
//   try {
//     dispatch(startLoading());
//     const order = await getOrder(no);
//     dispatch(getOrderSuccess(order));
//   } catch (e) {
//     dispatch(getOrderFail(e.toString()));
//   }
// };
