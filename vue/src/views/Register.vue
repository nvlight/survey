<template>
    <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register for free</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            Or
            {{ ' ' }}
            <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500"
            >sign in to your account</router-link>
        </p>
    </div>
    <form @submit.prevent="register" class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
            <div>
                <label for="fullname" class="sr-only">Full name</label>
                <input id="fullname" name="name" type="text" autocomplete="name" v-model="user.name" required="" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Full name" />
            </div>
            <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email" type="text" autocomplete="email" v-model="user.email" required="" class="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password" v-model="user.password" required="" class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
            </div>
            <div>
                <label for="password_confirmation" class="sr-only">Password</label>
                <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password" v-model="user.password_confirmation" required="" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password confirmation" />
            </div>

        </div>

        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>

            <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
            </div>
        </div>

        <Alert v-if="Object.keys(errors).length" @closeAlert="errors = {}">
            <div v-for="(error,index) in errors"
                 :key="index"
            >
                <div>
                    <div v-if="typeof error == 'object'" >
                        <div v-for="(er,index) in error">
                            * {{er}}
                        </div>
                    </div>
                    <div v-else>
                        {{error}}
                    </div>
                </div>
            </div>
        </Alert>

        <div>
            <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
                Register
            </button>
        </div>
    </form>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import store from '../store'
import {useRouter} from "vue-router";
import {ref} from "vue";
import Alert from "../components/Alert.vue";

const router = useRouter();
const loading = ref(false);

const user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
}

const errors = ref({});

function register(ev){
    loading.value = true;
    store
        .dispatch('register', user)
        .then( () => {
            loading.value = false;
            router.push({name: 'Dashboard'})
        })
        .catch(err => {
            loading.value = false;
            if (err.response.status = 422){
                errors.value = err.response.data.errors;
            }
        })
}
</script>
