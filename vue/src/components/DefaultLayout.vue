<template>
    <!--
      This example requires updating your template:

      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    -->
    <div class="min-h-full">
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                 alt="Your Company"/>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <router-link v-for="item in navigation"
                                    :key="item.name"
                                    :to="item.to"
                                    active-class="bg-gray-900 text-white"
                                    :class="[
                                        $route.name === item.to.name
                                        ? ''
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        ,'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                                    ]"
                                >{{ item.name }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <button type="button"
                                    class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span class="sr-only">View notifications</span>
                                <BellIcon class="h-6 w-6" aria-hidden="true"/>
                            </button>

                            <!-- Profile dropdown -->
                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton
                                        class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span class="sr-only">Open user menu</span>
<!--                                        <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt=""/>-->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                             class="w-6 h-6 text-gray-400 hover:text-white">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100"
                                            enter-from-class="transform opacity-0 scale-95"
                                            enter-to-class="transform opacity-100 scale-100"
                                            leave-active-class="transition ease-in duration-75"
                                            leave-from-class="transform opacity-100 scale-100"
                                            leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems
                                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                                            <a :href="item.href"
                                               :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{
                                                    item.name
                                                }}</a>
                                        </MenuItem>
                                        <MenuItem  v-slot="{ active }">
                                            <a @click="logout"
                                               :class="[active ? 'bg-gray-100' : ''
                                               , 'block px-4 py-2 text-sm text-gray-700 cursor-pointer']"
                                            >Sign out
                                            </a>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true"/>
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="md:hidden">
                <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    <router-link v-for="item in navigation" :key="item.name" as="a" :to="item.to"
                        active-class="bg-gray-900 text-white"
                        :class="[
                            $route.name === item.to.name
                            ? ''
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium ']"
                    >{{ item.name }}
                    </router-link>
                </div>
                <div class="border-t border-gray-700 pt-4 pb-3">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
<!--                            <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt=""/>-->
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                 class="w-6 h-6 text-gray-400 hover:text-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium leading-none text-white">{{ user?.name }}</div>
                            <div class="text-sm font-medium leading-none text-gray-400">{{ user?.email }}</div>
                        </div>
                        <button type="button"
                                class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="sr-only">View notifications</span>
                            <BellIcon class="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <div class="mt-3 space-y-1 px-2">
                        <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href"
                                          class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                            {{ item.name }}
                        </DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>

        <router-view></router-view>

        <Notification/>
    </div>
</template>

<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/vue/24/outline'

import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import {useRouter} from "vue-router";
import Notification from "../components/Notification.vue"

const navigation = [
    {name: 'Dashboard', to: {name: 'Dashboard'} },
    {name: 'Surveys', to: {name: 'Surveys'} },
]
const userNavigation = [
    {name: 'Your Profile', href: '#'},
    {name: 'Settings', href: '#'},
 ]

const store = useStore();
const router = useRouter();
const user = computed( () => store.state.dashboard.data.user );

function getUser(){
    store.dispatch('getUserData')
        .then( response => {
            //console.log(response.data);
        })
        .catch(err =>{
            //console.log(err.response.data)
        })
}

function logout(ev){
    store.dispatch('logout')
        .then( response => {
            if (response.success){
                router.push({name: 'Login'})
            }
        })
        .catch(err =>{
            console.log(err.response.data)
        })
}

onMounted( () => {
    getUser();
})

</script>
