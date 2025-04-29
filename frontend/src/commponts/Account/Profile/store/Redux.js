import { createSlice } from '@reduxjs/toolkit';
const ptn = createSlice({
  name: 'show_edite',
  initialState: {
    show: false,
    picture: false,
    oldpass: '',
    userInput: '',
    Input_confirm: '',
    submit1: 'فادي_66',
    fullname: 'فادي أحمد قاسم',
    email: 'fadi66@gmail.com',
    number: '123456789',
    location: 'سوريا حمص',
    pass: 'fadi123',
    error: '',
    // label: "الاسم الكامل",
    label: 'الاسم المستخدم',
  },
  reducers: {
    toggleShow: (state) => {
      state.show = true;
    },
    togglePicture: (state) => {
      state.picture = true;
    },
    exitpicture: (state) => {
      state.picture = false;
    },
    exitShow: (state) => {
      state.show = false;
    },

    setInput: (state, action) => {
      state.userInput = action.payload;
    },
    thisPass: (state, action) => {
      state.oldpass = action.payload;
    },
    setInput_confirm: (state, action) => {
      state.Input_confirm = action.payload;
    },
    submit: (state) => {
      state.submit1 = state.userInput;
    },
    error_msg: (state, action) => {
      state.error = action.payload;
    },
    updateFullName: (state) => {
      state.fullname = state.userInput;
    },
    updateEmail: (state) => {
      state.email = state.userInput;
    },
    updatePhone: (state) => {
      state.number = state.userInput;
    },
    updateLocation: (state) => {
      state.location = state.userInput;
    },
    updatepass: (state) => {
      state.pass = state.userInput;
    },

    labelName: (state, action) => {
      state.label = action.payload;
    },
  },
});

export const {
  togglePicture,
  exitpicture,
  toggleShow,
  exitShow,
  thisPass,
  setInput,
  setInput_confirm,
  submit,
  error_msg,
  updateFullName,
  updateEmail,
  updatePhone,
  updateLocation,
  updatepass,
  labelName,
} = ptn.actions;
export default ptn.reducer;
