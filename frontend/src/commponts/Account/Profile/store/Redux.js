import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../AxiosInterceptors';
import { useState } from 'react';

export const fetchUserFromAPI = createAsyncThunk(
  'show_edite/fetchUser',
  async (_, data) => {
    try {
      const token = localStorage.getItem('jwt');
      const res = await axiosInstance.get('/api/v1/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data.data;
    } catch (error) {
      return data.rejectWithValue(
        error.response?.data?.message || 'حدث خطأ في تحميل البيانات'
      );
    }
  }
);

const ptn = createSlice({
  
  name: 'show_edite',
  initialState: {
    id:'',
    show: false,
    picture: false,
    oldpass: '',
    userInput: '',
    Input_confirm: '',
    name: 'يتم تحميل معلوماتك',
    fullname: 'فادي أحمد قاسم',
    email:  'يتم تحميل معلوماتك',
    phone:  'يتم تحميل معلوماتك',
    location: 'سوريا حمص',
    pass: 'fadi123',
    error: '',
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
           const token = localStorage.getItem('jwt');
      const valdition={}
      axiosInstance.patch(`/api/v1/users/updateMe`, JSON.stringify({'name':state.submit1}), {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // setHoverAuction('spinner');
          alert('تم تغيير الاسم بنجاح')
          window.location.reload();
          console.log(res);
        })
        .catch((error) => {
          // setHoverAuction('spinner');
          if (error.response) {
            valdition.messageBackend =
              error.response.data.message;
            // setErrorMessageupdate(valdition);
            console.log('p3');
          } else {
            console.log('An unexpected error occurred:', error.message);
            // setErrorMessageupdate({
            //   messageBackend: 'An unexpected error occurred.',
            // });
          }
        })
    },
    error_msg: (state, action) => {
      state.error = action.payload;
    },
    updateFullName: (state) => {
      state.fullname = state.userInput;
    },
    updateEmail: (state) => {
      state.email = state.userInput;
           const token = localStorage.getItem('jwt');
      const valdition={}
      axiosInstance.patch(`/api/v1/users/updateMe`, JSON.stringify({'email':state.email}), {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // setHoverAuction('spinner');
             alert('تم تغيير البريد الإلكتروني بنجاح')
          window.location.reload();
          console.log(res);
        })
        .catch((error) => {
          // setHoverAuction('spinner');
          if (error.response) {
            valdition.messageBackend =
              error.response.data.message;
            // setErrorMessageupdate(valdition);
            console.log('p3');
          } else {
            console.log('An unexpected error occurred:', error.message);
            // setErrorMessageupdate({
            //   messageBackend: 'An unexpected error occurred.',
            // });
          }
        })
    },
    
    updatePhone: (state) => {
      
      state.number = state.userInput;
       const token = localStorage.getItem('jwt');
      const valdition={}
      axiosInstance.patch(`/api/v1/users/updateMe`, JSON.stringify({'phone':state.number}), {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
              alert('تم تغيير الرقم بنجاح')
          // setHoverAuction('spinner');
          window.location.reload();
         
         
          console.log(res);
        })
        .catch((error) => {
          // setHoverAuction('spinner');
          if (error.response) {
            valdition.messageBackend =
              error.response.data.message;
            // setErrorMessageupdate(valdition);
            console.log('p3');
          } else {
            console.log('An unexpected error occurred:', error.message);
            // setErrorMessageupdate({
            //   messageBackend: 'An unexpected error occurred.',
            // });
          }
        })
    },
    updateLocation: (state) => {
       
      state.location = state.userInput;
      
    },
    updatepass: (state) => {
      state.pass = state.userInput;
       const token = localStorage.getItem('jwt');
      const valdition={}
      axiosInstance.patch(`/api/v1/users/updateMyPassword`, JSON.stringify({'password':state.pass,'passwordCurrent':state.oldpass,'passwordConfirm':state.Input_confirm}), {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
             alert('تم تغيير كلمة المرور بنجاح')
          // setHoverAuction('spinner');
          window.location.reload();
        
          console.log(res);
        })
        .catch((error) => {
          // setHoverAuction('spinner');
          if (error.response) {
            valdition.messageBackend =
              error.response.data.message;
            // setErrorMessageupdate(valdition);
            console.log('p3');
          } else {
            console.log('An unexpected error occurred:', error.message);
            // setErrorMessageupdate({
            //   messageBackend: 'An unexpected error occurred.',
            // });
          }
        })
    },
    labelName: (state, action) => {
      state.label = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFromAPI.fulfilled, (state, action) => {
        const user = action.payload;
        state.id= user?._id || state.id;
        state.name = user?.name || state.name;

        state.email = user?.email || state.email;
        state.phone = user?.phone || state.phone;
        state.location = user?.location || state.location;
      })
      .addCase(fetchUserFromAPI.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  id,
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