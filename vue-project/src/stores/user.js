// user.js
import { auth, db } from '@/includes/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, deleteDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    userObj: null,
    UserType: null,
    isMounted: false,
    notifications: []
  }),

  actions: {
    async createUser(values) {
      try {
        // Create user with email and password
        const usercred = await createUserWithEmailAndPassword(auth, values.email, values.password)

        // Create user document in Firestore
        const userDocRef = doc(db, 'admin', usercred.user.uid)
        await setDoc(userDocRef, {
          name: values.name,
          age: values.age,
          country: values.country,
          email: values.email,
          createdAt: new Date(),
          Role: 'admin'
        })

        // Update user profile display name
        await updateProfile(usercred.user, {
          displayName: values.name
        })
        // console.log('user cred')
        console.log(usercred)
        this.userLoggedIn = true
        console.log('user details after loging in' + this.userLoggedIn) // Verify user is logged in
        console.log('user details after registration' + this.userLoggedIn) // Verify user is logged in
      } catch (error) {
        // Handle any errors
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = `Error: ${error.message}`
        console.error(error.code, error.message)
      }
    },

    async authenticate(values) {
      const u = await signInWithEmailAndPassword(auth, values.email, values.password)
      console.log(u)
      this.userLoggedIn = true
    },
    setUser(user) {
      this.userObj = user
    },
    async logout() {
      await signOut(auth)
      this.setUser(null)
    },
    async deleteNotification(docRef) {
      await deleteDoc(doc(db, 'notifications', docRef))
    }
  },
  getters: {
    interface(state) {
      return state.UserType == 'admin' ? true : false
    }
  }
})
