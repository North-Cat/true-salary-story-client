<template>
    <div class="bg-stone-300 text-black-10">
        <div class="container mx-auto max-w-7xl flex flex-col pt-10">
            <div class="mb-1 text-stone-600">Style</div>
            <div class="py-10 bg-white px-10">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full sm:w-1/2 px-2">
                        <div class="text-2xl text-blue mb-5">Color</div>
                        <div class="flex flex-row mb-5 font-semibold">
                            <div class="flex flex-col">
                                <div class="bg-white border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-white</div>
                                <div class="text-xs text-stone-600">#FFFFFF</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-gray border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-gray</div>
                                <div class="text-xs text-stone-600">#F5F5F8</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-dark border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-dark</div>
                                <div class="text-xs text-stone-600">#D4D4D7</div>
                            </div>
                        </div>
                        <div class="flex flex-row mb-5 font-semibold">
                            <div class="flex flex-col">
                                <div class="bg-black-10 border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-black-10</div>
                                <div class="text-xs text-stone-600">#2B2B31</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-black-6 border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-black-6</div>
                                <div class="text-xs text-stone-600">#2B2B31A8</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-black-5 border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-black-5</div>
                                <div class="text-xs text-stone-600">#2B2B3180</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-black-3 border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-black-3</div>
                                <div class="text-xs text-stone-600">#2B2B314D</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-black-1 border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-black-1</div>
                                <div class="text-xs text-stone-600">#2B2B311A</div>
                            </div>
                        </div>
                        <div class="flex flex-row mb-5 font-semibold">
                            <div class="flex flex-col">
                                <div class="bg-blue border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-blue</div>
                                <div class="text-xs text-stone-600">#366BAB</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-green border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-green</div>
                                <div class="text-xs text-stone-600">#329063</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-yellow border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-yellow</div>
                                <div class="text-xs text-stone-600">#D08B24</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-red border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-red</div>
                                <div class="text-xs text-stone-600">#BE2C61</div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full sm:w-1/2 px-2">
                        <div class="text-2xl text-blue mb-5">Typography</div>
                        <div class="mb-2">
                            <h1 class="mb-2 me-4 inline-block">Title / H1</h1>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h1Code"></span>
                        </div>
                        <div class="mb-2">
                            <h2 class="mb-2 me-4 inline-block">Title / H2</h2>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h2Code"></span>
                        </div>
                        <div class="mb-2">
                            <h3 class="mb-2 me-4 inline-block">Title / H3</h3>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h3Code"></span>
                        </div>
                        <div class="mb-2">
                            <h4 class="mb-2 me-4 inline-block">Title / H4</h4>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h4Code"></span>
                        </div>
                        <div class="mb-2">
                            <h5 class="mb-2 me-4 inline-block">Title / H5</h5>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h5Code"></span>
                        </div>
                        <div class="mb-2">
                            <h6 class="mb-2 me-4 inline-block">Title / H6</h6>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h6Code"></span>
                        </div>
                        <div class="mb-2">
                            <div class="body mb-2 me-4 inline-block">Title / Body.20</div>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="bodyCode"></span>
                        </div>
                        <div class="mb-2">
                            <div class="body-sm mb-2 me-4 inline-block">Title / Body.16</div>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="bodySmCode"></span>
                        </div>
                        <div class="mb-10">
                            <div class="caption mb-2 me-4 inline-block">Title / Caption</div>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="captionCode"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mx-auto max-w-7xl flex flex-col pt-10">
            <div class="mb-1 text-stone-600">Component</div>
            <div class="py-10 bg-white px-10">
                <div class="flex flex-wrap -mx-2 border-b-2 border-stone-300 py-5">
                    <div class="w-full sm:w-2/12 px-2">
                    </div>
                    <div class="w-full sm:w-6/12 px-2">
                        <div class="flex flex-row justify-center ">
                            <h4>Default / Hover / Pressed</h4>
                        </div>
                    </div>
                    <div class="w-full sm:w-4/12 px-2">
                        <div class="flex flex-row justify-center">
                            <h4>使用方法</h4>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-2 border-b-2 border-stone-300 py-10 ">
                    <div class="w-full sm:w-2/12 px-2">
                        <h4 class="h4 ms-10">Button</h4>
                    </div>
                    <div class="w-full sm:w-6/12 px-2">               
                        <div class="flex flex-row justify-center items-center mb-6 ">
                            <btn cate="text" content="匿名分享" class="me-0">
                                <svg class="me-2" width="23" height="23" viewBox="-2 -3 23 23">
                                    <path d="M15.8438 3.09375L16.375 2.55469C16.7031 2.21875 16.7188 1.75 16.3984 1.42969L16.1719 1.21094C15.8906 0.929688 15.4062 0.976562 15.0938 1.28906L14.5625 1.8125L15.8438 3.09375ZM6.58594 11.3906L8.23438 10.7109L15.2344 3.70312L13.9453 2.42969L6.95312 9.4375L6.24219 11.0312C6.15625 11.2422 6.39062 11.4688 6.58594 11.3906ZM3.55469 16.7266H12.6094C14.1719 16.7266 15.0859 15.8125 15.0859 14.1016V5.91406L13.3438 7.65625V13.9141C13.3438 14.6328 12.9688 14.9844 12.4609 14.9844H3.70312C3.01562 14.9844 2.64844 14.6328 2.64844 13.9141V5.35156C2.64844 4.63281 3.01562 4.28125 3.70312 4.28125H10.0391L11.7812 2.54688H3.55469C1.82812 2.54688 0.90625 3.45312 0.90625 5.17188V14.1016C0.90625 15.8125 1.82812 16.7266 3.55469 16.7266Z"/>
                                </svg>
                            </btn>
                            <btn cate="text" content="搜尋" class="me-10">
                                <svg class="me-2" width="22" height="22" viewBox="-2 -2 21 21">
                                    <path d="M0.226562 6.97656C0.226562 10.5391 3.11719 13.4297 6.67969 13.4297C7.94531 13.4297 9.10938 13.0547 10.0859 12.4219L13.4844 15.8203C13.7422 16.0781 14.0859 16.2031 14.4453 16.2031C15.2109 16.2031 15.7734 15.6172 15.7734 14.8672C15.7734 14.5078 15.6406 14.1719 15.3906 13.9219L12.0234 10.5391C12.7266 9.53125 13.1328 8.30469 13.1328 6.97656C13.1328 3.40625 10.2422 0.515625 6.67969 0.515625C3.11719 0.515625 0.226562 3.40625 0.226562 6.97656ZM2.13281 6.97656C2.13281 4.46094 4.16406 2.42188 6.67969 2.42188C9.19531 2.42188 11.2344 4.46094 11.2344 6.97656C11.2344 9.48438 9.19531 11.5234 6.67969 11.5234C4.16406 11.5234 2.13281 9.48438 2.13281 6.97656Z"/>
                                </svg>
                            </btn>
                            <btn cate="secondary" content="登入" class="me-5">
                                <svg class="me-1" width="24" height="24" viewBox="-3 -3 24 24">
                                    <path d="M9 10.1836C11.3828 10.1836 13.3066 8.09375 13.3066 5.50586C13.3066 2.97656 11.3828 0.935547 9 0.935547C6.62695 0.935547 4.67383 2.99609 4.68359 5.52539C4.69336 8.09375 6.60742 10.1836 9 10.1836ZM9 8.32812C7.70117 8.32812 6.60742 7.13672 6.60742 5.51562C6.59766 3.95312 7.70117 2.79102 9 2.79102C10.3086 2.79102 11.3926 3.94336 11.3926 5.50586C11.3926 7.12695 10.3086 8.32812 9 8.32812ZM2.93555 19.2949H15.0449C16.7734 19.2949 17.623 18.7285 17.623 17.5371C17.623 14.7734 14.1953 11.2676 8.99023 11.2676C3.79492 11.2676 0.367188 14.7734 0.367188 17.5371C0.367188 18.7285 1.20703 19.2949 2.93555 19.2949ZM2.7207 17.4492C2.51562 17.4492 2.4375 17.3711 2.4375 17.2051C2.4375 15.7891 4.80078 13.123 8.99023 13.123C13.1797 13.123 15.5527 15.7891 15.5527 17.2051C15.5527 17.3711 15.4746 17.4492 15.2598 17.4492H2.7207Z" />
                                </svg>
                            </btn>
                            <btn cate="primary" content="加薪計畫" class="me-5">
                                <svg class="me-1" width="24" height="24" viewBox="0 0 20 24">
                                    <path d="M9.30664 5.72266C9.45312 5.72266 9.54102 5.625 9.56055 5.48828C9.83398 3.92578 9.81445 3.87695 11.4941 3.55469C11.6406 3.52539 11.7285 3.44727 11.7285 3.30078C11.7285 3.1543 11.6309 3.06641 11.4941 3.04688C9.81445 2.76367 9.83398 2.70508 9.56055 1.11328C9.54102 0.976562 9.45312 0.878906 9.30664 0.878906C9.16016 0.878906 9.07227 0.976562 9.05273 1.12305C8.78906 2.67578 8.80859 2.72461 7.11914 3.04688C6.97266 3.06641 6.88477 3.1543 6.88477 3.30078C6.88477 3.44727 6.97266 3.52539 7.12891 3.55469C8.79883 3.85742 8.7793 3.90625 9.05273 5.48828C9.07227 5.625 9.16016 5.72266 9.30664 5.72266ZM4.57031 12.6172C4.77539 12.6172 4.94141 12.4707 4.96094 12.2656C5.30273 9.6875 5.37109 9.67773 8.06641 9.17969C8.27148 9.14062 8.41797 8.99414 8.41797 8.7793C8.41797 8.56445 8.26172 8.4082 8.06641 8.37891C5.38086 8.00781 5.30273 7.92969 4.96094 5.30273C4.94141 5.08789 4.78516 4.93164 4.57031 4.93164C4.35547 4.93164 4.18945 5.08789 4.16992 5.3125C3.85742 7.88086 3.74023 7.88086 1.06445 8.37891C0.859375 8.41797 0.712891 8.56445 0.712891 8.7793C0.712891 9.00391 0.859375 9.14062 1.11328 9.17969C3.75 9.58984 3.85742 9.66797 4.16992 12.2363C4.18945 12.4707 4.35547 12.6172 4.57031 12.6172ZM11.4258 23.4668C11.7578 23.4668 12.0117 23.2227 12.0703 22.8809C12.7734 17.6367 13.5156 16.8457 18.6621 16.2695C19.0234 16.2305 19.2773 15.957 19.2773 15.6152C19.2773 15.2734 19.0234 15.0098 18.6621 14.9609C13.5254 14.3457 12.8223 13.6035 12.0703 8.35938C12.0117 8.00781 11.7578 7.76367 11.4258 7.76367C11.084 7.76367 10.8301 8.00781 10.7715 8.35938C10.0684 13.6035 9.32617 14.3848 4.17969 14.9609C3.82812 15 3.57422 15.2734 3.57422 15.6152C3.57422 15.957 3.81836 16.2207 4.17969 16.2695C9.31641 16.9629 10 17.6367 10.7715 22.8809C10.8301 23.2227 11.0938 23.4668 11.4258 23.4668Z"/>
                                </svg>
                            </btn>
                        </div>
                        <div class="flex flex-row justify-center items-center mb-6">
                            <btn cate="text-sm" content="分享">
                                <svg class="translate-x-px mb-1" width="24" height="24" viewBox="-1 0 24 24">
                                    <path d="M22.1602 2.92969L23.0039 2.0625C23.4023 1.64062 23.4023 1.07812 23.0039 0.691406L22.7344 0.410156C22.3711 0.046875 21.7969 0.09375 21.4102 0.46875L20.5547 1.3125L22.1602 2.92969ZM8.0625 15.7148L10.3477 14.7188L21.293 3.78516L19.6875 2.20312L8.75391 13.1367L7.69922 15.3398C7.60547 15.5391 7.83984 15.8086 8.0625 15.7148ZM3.79688 23.3086H17.5547C19.6641 23.3086 20.8828 22.0898 20.8828 19.6758V7.14844L18.9961 9.03516V19.582C18.9961 20.8008 18.3398 21.4219 17.5312 21.4219H3.83203C2.66016 21.4219 2.00391 20.8008 2.00391 19.582V6.28125C2.00391 5.0625 2.66016 4.42969 3.83203 4.42969H14.5078L16.3945 2.54297H3.79688C1.35938 2.54297 0.117188 3.76172 0.117188 6.17578V19.6758C0.117188 22.1016 1.35938 23.3086 3.79688 23.3086Z" />
                                </svg>
                            </btn>
                        </div>
                    </div>
                    <div class="w-full sm:w-4/12 px-2">
                        <div class="flex flex-col justify-center items-start">
                            <div class="w-full bg-stone-200 py-2 px-5 text-xs text-stone-600 rounded"> 
                                <pre><code>
&#060;btn &#058;cate&#061;&#034;cate&#034; &#058;content&#061;&#034;content&#034;&#062;
    &#060;svg&#062; icon &#060;&#047;svg&#062;
&#060;&#047;btn&#062;

套件路徑: @/components/btn.vue
參數說明:
    cate: 
        類型, 傳入 String , 選項如下
            'secondary': 次要按鈕,
            'primary': 主要按鈕,
            'text': 無邊框, 
            'text-sm': 小型無邊框
    content: 
        文字內容, 傳入 String
                            </code></pre>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-2 border-b-2 border-stone-300 py-10 ">
                    <div class="w-full sm:w-2/12 px-2">
                        <h4 class="h4 ms-10">Nav</h4>
                    </div>
                    <div class="w-full sm:w-6/12 px-2">
                        <div class="flex flex-row justify-center items-start mb-6 ">
                            <nav-btn :isCircle="true" :isLeft="true" class="me-5"></nav-btn>
                            <nav-btn :isCircle="true" :isLeft="false" ></nav-btn>
                        </div>
                        <div class="flex flex-row justify-center items-center">
                            <nav-btn :isCircle="false" :isLeft="true" class="me-5"></nav-btn>
                            <nav-btn :isCircle="false" :isLeft="false" ></nav-btn>
                        </div>
                    </div>
                    <div class="w-full sm:w-4/12 px-2">
                        <div class="flex flex-col justify-center items-start">
                            <div class="w-full bg-stone-200 py-2 px-5 text-xs text-stone-600 rounded"> 
                                <pre><code>
&#060;nav-btn &#058;isCircle&#061;&#034;isCircle&#034; &#058;isLeft&#061;&#034;isLeft&#034;&#062;&#060;&#047;nav-btn&#062;

套件路徑: @/components/navBtn.vue
參數說明:
    isCircle: 
        是否為圓, 傳入 Boolean
            true: 圓形,
            false: 方形
    isLeft: 
        是否為左, 傳入 Boolean
            true: 向左,
            false: 向右
                            </code></pre>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-2 border-b-2 border-stone-300 py-10 ">
                    <div class="w-full sm:w-2/12 px-2">
                        <h4 class="h4 ms-10">Card</h4>
                    </div>
                    <div class="w-full sm:w-6/12 px-2">
                        <div class="flex flex-col justify-center items-center mb-6  ">
                            <card 
                                class="mb-2"
                                cate="top" 
                                title="國內業務人員" 
                                company="櫻花廚房器具_櫻欣興業股份有限公司" 
                                overtime="1" feeling="1">
                            </card>
                            <card 
                                cate="new" 
                                title="國內業務人員" 
                                company="櫻花廚房器具_櫻欣興業股份有限公司" 
                                overtime="2" feeling="3">
                            </card>
                        </div>
                        <div class="flex flex-row justify-center items-start mb-6">
                            <div 
                            class="caption border border-green text-green fill-green rounded-full flex justify-center items-center px-3 py-1 me-0">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4.75C8.27614 4.75 8.5 4.97386 8.5 5.25V8.91667C8.5 9.02485 8.53509 9.13012 8.6 9.21667L9.9 10.95C10.0657 11.1709 10.0209 11.4843 9.8 11.65C9.57909 11.8157 9.26569 11.7709 9.1 11.55L7.8 9.81667C7.60527 9.55702 7.5 9.24122 7.5 8.91667V5.25C7.5 4.97386 7.72386 4.75 8 4.75Z" fill="#329163"/>
                                    <path d="M8 14.5C11.2817 14.5 14 11.7875 14 8.5C14 5.2183 11.2817 2.5 7.99419 2.5C4.71249 2.5 2 5.2183 2 8.5C2 11.7875 4.7183 14.5 8 14.5ZM8 13.3209C5.32817 13.3209 3.1849 11.1718 3.1849 8.5C3.1849 5.82817 5.32236 3.6849 7.99419 3.6849C10.666 3.6849 12.8209 5.82817 12.8209 8.5C12.8209 11.1718 10.6718 13.3209 8 13.3209Z" fill="#329163"/>
                                    <circle cx="12" cy="4.5" r="3" fill="white"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5273 3.08403C13.7571 3.2372 13.8192 3.54764 13.666 3.7774L12.2074 5.96538C11.9105 6.41069 11.2562 6.41068 10.9593 5.96538L10.334 5.0274C10.1808 4.79764 10.2429 4.4872 10.4726 4.33403C10.7024 4.18085 11.0128 4.24294 11.166 4.4727L11.5833 5.09867L12.834 3.2227C12.9871 2.99294 13.2976 2.93085 13.5273 3.08403Z" fill="#329163"/>
                                </svg>
                                <span class="ms-1">準時上下班</span>
                            </div>
                            <div 
                            class="caption border border-green text-green fill-green rounded-full flex justify-center items-center px-3 py-1 me-0">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4.75C8.27614 4.75 8.5 4.97386 8.5 5.25V8.91667C8.5 9.02485 8.53509 9.13012 8.6 9.21667L9.9 10.95C10.0657 11.1709 10.0209 11.4843 9.8 11.65C9.57909 11.8157 9.26569 11.7709 9.1 11.55L7.8 9.81667C7.60527 9.55702 7.5 9.24122 7.5 8.91667V5.25C7.5 4.97386 7.72386 4.75 8 4.75Z" fill="#329163"/>
                                    <path d="M8 14.5C11.2817 14.5 14 11.7875 14 8.5C14 5.2183 11.2817 2.5 7.99419 2.5C4.71249 2.5 2 5.2183 2 8.5C2 11.7875 4.7183 14.5 8 14.5ZM8 13.3209C5.32817 13.3209 3.1849 11.1718 3.1849 8.5C3.1849 5.82817 5.32236 3.6849 7.99419 3.6849C10.666 3.6849 12.8209 5.82817 12.8209 8.5C12.8209 11.1718 10.6718 13.3209 8 13.3209Z" fill="#329163"/>
                                    <circle cx="12" cy="4.5" r="3" fill="white"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5273 3.08403C13.7571 3.2372 13.8192 3.54764 13.666 3.7774L12.2074 5.96538C11.9105 6.41069 11.2562 6.41068 10.9593 5.96538L10.334 5.0274C10.1808 4.79764 10.2429 4.4872 10.4726 4.33403C10.7024 4.18085 11.0128 4.24294 11.166 4.4727L11.5833 5.09867L12.834 3.2227C12.9871 2.99294 13.2976 2.93085 13.5273 3.08403Z" fill="#329163"/>
                                </svg>
                                <span class="ms-1">很少加班</span>
                            </div>
                            <div 
                            class="caption border border-yellow text-yellow fill-yellow rounded-full flex justify-center items-center px-3 py-1 me-0">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14.5C11.2817 14.5 14 11.7875 14 8.5C14 5.2183 11.2817 2.5 7.99419 2.5C4.71249 2.5 2 5.2183 2 8.5C2 11.7875 4.7183 14.5 8 14.5ZM8 13.3209C5.32817 13.3209 3.1849 11.1718 3.1849 8.5C3.1849 5.82817 5.32236 3.6849 7.99419 3.6849C10.666 3.6849 12.8209 5.82817 12.8209 8.5C12.8209 11.1718 10.6718 13.3209 8 13.3209Z" fill="#D08B24"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4.75C8.27614 4.75 8.5 4.97386 8.5 5.25V8.91667C8.5 9.02485 8.53509 9.13012 8.6 9.21667L9.9 10.95C10.0657 11.1709 10.0209 11.4843 9.8 11.65C9.57909 11.8157 9.26569 11.7709 9.1 11.55L7.8 9.81667C7.60527 9.55702 7.5 9.24122 7.5 8.91667V5.25C7.5 4.97386 7.72386 4.75 8 4.75Z" fill="#D08B24"/>
                                </svg>

                                <span class="ms-1">偶爾加班</span>
                            </div>
                            <div 
                            class="caption border border-red text-red fill-red rounded-full flex justify-center items-center px-3 py-1 me-0">
                                <svg class="me-1" width="16" height="17" viewBox="0 0 16 17">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4.75C8.27614 4.75 8.5 4.97386 8.5 5.25V8.91667C8.5 9.02485 8.53509 9.13012 8.6 9.21667L9.9 10.95C10.0657 11.1709 10.0209 11.4843 9.8 11.65C9.57909 11.8157 9.26569 11.7709 9.1 11.55L7.8 9.81667C7.60527 9.55702 7.5 9.24122 7.5 8.91667V5.25C7.5 4.97386 7.72386 4.75 8 4.75Z" />
                                    <path d="M8 14.5C11.2817 14.5 14 11.7875 14 8.5C14 5.2183 11.2817 2.5 7.99419 2.5C4.71249 2.5 2 5.2183 2 8.5C2 11.7875 4.7183 14.5 8 14.5ZM8 13.3209C5.32817 13.3209 3.1849 11.1718 3.1849 8.5C3.1849 5.82817 5.32236 3.6849 7.99419 3.6849C10.666 3.6849 12.8209 5.82817 12.8209 8.5C12.8209 11.1718 10.6718 13.3209 8 13.3209Z" />
                                    <circle cx="12" cy="4.5" r="3" fill="white"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0458 2.92794C10.8752 2.75734 10.5986 2.75734 10.428 2.92794C10.2574 3.09853 10.2574 3.37513 10.428 3.54572L11.3823 4.49999L10.428 5.45425C10.2574 5.62485 10.2574 5.90144 10.428 6.07204C10.5986 6.24264 10.8752 6.24264 11.0458 6.07204L12 5.11778L12.9543 6.07204C13.1249 6.24264 13.4015 6.24264 13.5721 6.07204C13.7427 5.90144 13.7427 5.62485 13.5721 5.45425L12.6178 4.49999L13.5721 3.54572C13.7427 3.37513 13.7427 3.09853 13.5721 2.92794C13.4015 2.75734 13.1249 2.75734 12.9543 2.92794L12 3.8822L11.0458 2.92794Z" />
                                </svg>
                                <span class="ms-1">常常加班</span>
                            </div>
                            <div 
                            class="caption border border-red text-red fill-red rounded-full flex justify-center items-center px-3 py-1 me-0">
                                <svg class="me-1" width="16" height="17" viewBox="0 0 16 17">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4.75C8.27614 4.75 8.5 4.97386 8.5 5.25V8.91667C8.5 9.02485 8.53509 9.13012 8.6 9.21667L9.9 10.95C10.0657 11.1709 10.0209 11.4843 9.8 11.65C9.57909 11.8157 9.26569 11.7709 9.1 11.55L7.8 9.81667C7.60527 9.55702 7.5 9.24122 7.5 8.91667V5.25C7.5 4.97386 7.72386 4.75 8 4.75Z" />
                                    <path d="M8 14.5C11.2817 14.5 14 11.7875 14 8.5C14 5.2183 11.2817 2.5 7.99419 2.5C4.71249 2.5 2 5.2183 2 8.5C2 11.7875 4.7183 14.5 8 14.5ZM8 13.3209C5.32817 13.3209 3.1849 11.1718 3.1849 8.5C3.1849 5.82817 5.32236 3.6849 7.99419 3.6849C10.666 3.6849 12.8209 5.82817 12.8209 8.5C12.8209 11.1718 10.6718 13.3209 8 13.3209Z" />
                                    <circle cx="12" cy="4.5" r="3" fill="white"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0458 2.92794C10.8752 2.75734 10.5986 2.75734 10.428 2.92794C10.2574 3.09853 10.2574 3.37513 10.428 3.54572L11.3823 4.49999L10.428 5.45425C10.2574 5.62485 10.2574 5.90144 10.428 6.07204C10.5986 6.24264 10.8752 6.24264 11.0458 6.07204L12 5.11778L12.9543 6.07204C13.1249 6.24264 13.4015 6.24264 13.5721 6.07204C13.7427 5.90144 13.7427 5.62485 13.5721 5.45425L12.6178 4.49999L13.5721 3.54572C13.7427 3.37513 13.7427 3.09853 13.5721 2.92794C13.4015 2.75734 13.1249 2.75734 12.9543 2.92794L12 3.8822L11.0458 2.92794Z" />
                                </svg>
                                <span class="ms-1">賣肝拼經濟</span>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center items-start">
                            <div 
                            class="caption border border-green text-green fill-green rounded-full flex justify-center items-center px-3 py-1 me-0">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14.5C11.2817 14.5 14 11.7875 14 8.5C14 5.2183 11.2817 2.5 7.99419 2.5C4.71249 2.5 2 5.2183 2 8.5C2 11.7875 4.7183 14.5 8 14.5ZM8 13.3209C5.32817 13.3209 3.1849 11.1718 3.1849 8.5C3.1849 5.82817 5.32236 3.6849 7.99419 3.6849C10.666 3.6849 12.8209 5.82817 12.8209 8.5C12.8209 11.1718 10.6718 13.3209 8 13.3209ZM6.28074 7.97725C6.64666 7.97725 6.97193 7.64618 6.97193 7.18732C6.97193 6.72846 6.65247 6.39739 6.28074 6.39739C5.92062 6.39739 5.60697 6.72846 5.60697 7.18732C5.60697 7.64618 5.92062 7.97725 6.28074 7.97725ZM9.70765 7.97725C10.0736 7.97725 10.3988 7.64618 10.3988 7.18732C10.3988 6.72846 10.0736 6.39739 9.70765 6.39739C9.34172 6.39739 9.03388 6.72846 9.03388 7.18732C9.03388 7.64618 9.34753 7.97725 9.70765 7.97725ZM7.99419 11.3577C9.21394 11.3577 10.0329 10.5503 10.0329 10.1612C10.0329 10.0218 9.89351 9.95789 9.75992 10.016C9.33591 10.2367 8.84221 10.4981 7.99419 10.4981C7.15198 10.4981 6.65247 10.2367 6.22846 10.016C6.10068 9.95208 5.96128 10.0218 5.96128 10.1612C5.96128 10.5503 6.78025 11.3577 7.99419 11.3577Z" fill="#329163"/>
                                </svg>
                                <span class="ms-1">非常開心</span>
                            </div>
                            <div 
                            class="caption border border-green text-green fill-green rounded-full flex justify-center items-center px-3 py-1 me-0">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14.5C11.2817 14.5 14 11.7875 14 8.5C14 5.2183 11.2817 2.5 7.99419 2.5C4.71249 2.5 2 5.2183 2 8.5C2 11.7875 4.7183 14.5 8 14.5ZM8 13.3209C5.32817 13.3209 3.1849 11.1718 3.1849 8.5C3.1849 5.82817 5.32236 3.6849 7.99419 3.6849C10.666 3.6849 12.8209 5.82817 12.8209 8.5C12.8209 11.1718 10.6718 13.3209 8 13.3209ZM6.28074 7.97725C6.64666 7.97725 6.97193 7.64618 6.97193 7.18732C6.97193 6.72846 6.65247 6.39739 6.28074 6.39739C5.92062 6.39739 5.60697 6.72846 5.60697 7.18732C5.60697 7.64618 5.92062 7.97725 6.28074 7.97725ZM9.70765 7.97725C10.0736 7.97725 10.3988 7.64618 10.3988 7.18732C10.3988 6.72846 10.0736 6.39739 9.70765 6.39739C9.34172 6.39739 9.03388 6.72846 9.03388 7.18732C9.03388 7.64618 9.34753 7.97725 9.70765 7.97725ZM7.99419 11.3577C9.21394 11.3577 10.0329 10.5503 10.0329 10.1612C10.0329 10.0218 9.89351 9.95789 9.75992 10.016C9.33591 10.2367 8.84221 10.4981 7.99419 10.4981C7.15198 10.4981 6.65247 10.2367 6.22846 10.016C6.10068 9.95208 5.96128 10.0218 5.96128 10.1612C5.96128 10.5503 6.78025 11.3577 7.99419 11.3577Z" fill="#329163"/>
                                </svg> 
                                <span class="ms-1">還算愉快</span>
                            </div>
                            <div 
                            class="caption border border-yellow text-yellow fill-yellow rounded-full flex justify-center items-center px-3 py-1 me-0">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14.5C11.2817 14.5 14 11.7875 14 8.5C14 5.2183 11.2817 2.5 7.99419 2.5C4.71249 2.5 2 5.2183 2 8.5C2 11.7875 4.7183 14.5 8 14.5ZM8 13.3209C5.32817 13.3209 3.1849 11.1718 3.1849 8.5C3.1849 5.82817 5.32236 3.6849 7.99419 3.6849C10.666 3.6849 12.8209 5.82817 12.8209 8.5C12.8209 11.1718 10.6718 13.3209 8 13.3209ZM6.28074 7.97725C6.64666 7.97725 6.97193 7.64618 6.97193 7.18732C6.97193 6.72846 6.65247 6.39739 6.28074 6.39739C5.92062 6.39739 5.60697 6.72846 5.60697 7.18732C5.60697 7.64618 5.92062 7.97725 6.28074 7.97725ZM9.70765 7.97725C10.0736 7.97725 10.3988 7.64618 10.3988 7.18732C10.3988 6.72846 10.0736 6.39739 9.70765 6.39739C9.34172 6.39739 9.03388 6.72846 9.03388 7.18732C9.03388 7.64618 9.34753 7.97725 9.70765 7.97725Z" fill="#D08B24"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 10.5C5.625 10.2929 5.79289 10.125 6 10.125H10C10.2071 10.125 10.375 10.2929 10.375 10.5C10.375 10.7071 10.2071 10.875 10 10.875H6C5.79289 10.875 5.625 10.7071 5.625 10.5Z" fill="#D08B24"/>
                                </svg> 
                                <span class="ms-1">平常心</span>
                            </div>
                            <div 
                            class="caption border border-red text-red fill-red rounded-full flex justify-center items-center px-3 py-1 me-0">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14.5C11.2817 14.5 14 11.7875 14 8.5C14 5.2183 11.2817 2.5 7.99419 2.5C4.71249 2.5 2 5.2183 2 8.5C2 11.7875 4.7183 14.5 8 14.5ZM8 13.3209C5.32817 13.3209 3.1849 11.1718 3.1849 8.5C3.1849 5.82817 5.32236 3.6849 7.99419 3.6849C10.666 3.6849 12.8209 5.82817 12.8209 8.5C12.8209 11.1718 10.6718 13.3209 8 13.3209ZM6.28074 7.97725C6.64666 7.97725 6.97193 7.64618 6.97193 7.18732C6.97193 6.72846 6.65247 6.39739 6.28074 6.39739C5.92062 6.39739 5.60697 6.72846 5.60697 7.18732C5.60697 7.64618 5.92062 7.97725 6.28074 7.97725ZM9.70765 7.97725C10.0736 7.97725 10.3988 7.64618 10.3988 7.18732C10.3988 6.72846 10.0736 6.39739 9.70765 6.39739C9.34172 6.39739 9.03388 6.72846 9.03388 7.18732C9.03388 7.64618 9.34753 7.97725 9.70765 7.97725Z" fill="#BE2C61"/>
                                    <path d="M6.00002 10.8309C6.00002 10.4418 6.81899 9.6344 8.03874 9.6344C9.25268 9.6344 10.0717 10.4418 10.0717 10.8309C10.0717 10.9703 9.93226 11.04 9.80447 10.9761L9.80057 10.9741C9.3774 10.7538 8.87837 10.494 8.03874 10.494C7.19896 10.494 6.70663 10.7504 6.28537 10.9697L6.27301 10.9761C6.13942 11.0342 6.00002 10.9703 6.00002 10.8309Z" fill="#BE2C61"/>
                                </svg>
                                <span class="ms-1">有苦說不出</span>
                            </div>
                            <div 
                            class="caption border border-red text-red fill-red rounded-full flex justify-center items-center px-3 py-1 me-0">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14.5C11.2817 14.5 14 11.7875 14 8.5C14 5.2183 11.2817 2.5 7.99419 2.5C4.71249 2.5 2 5.2183 2 8.5C2 11.7875 4.7183 14.5 8 14.5ZM8 13.3209C5.32817 13.3209 3.1849 11.1718 3.1849 8.5C3.1849 5.82817 5.32236 3.6849 7.99419 3.6849C10.666 3.6849 12.8209 5.82817 12.8209 8.5C12.8209 11.1718 10.6718 13.3209 8 13.3209ZM6.28074 7.97725C6.64666 7.97725 6.97193 7.64618 6.97193 7.18732C6.97193 6.72846 6.65247 6.39739 6.28074 6.39739C5.92062 6.39739 5.60697 6.72846 5.60697 7.18732C5.60697 7.64618 5.92062 7.97725 6.28074 7.97725ZM9.70765 7.97725C10.0736 7.97725 10.3988 7.64618 10.3988 7.18732C10.3988 6.72846 10.0736 6.39739 9.70765 6.39739C9.34172 6.39739 9.03388 6.72846 9.03388 7.18732C9.03388 7.64618 9.34753 7.97725 9.70765 7.97725Z" fill="#BE2C61"/>
                                    <path d="M6.00002 10.8309C6.00002 10.4418 6.81899 9.6344 8.03874 9.6344C9.25268 9.6344 10.0717 10.4418 10.0717 10.8309C10.0717 10.9703 9.93226 11.04 9.80447 10.9761L9.80057 10.9741C9.3774 10.7538 8.87837 10.494 8.03874 10.494C7.19896 10.494 6.70663 10.7504 6.28537 10.9697L6.27301 10.9761C6.13942 11.0342 6.00002 10.9703 6.00002 10.8309Z" fill="#BE2C61"/>
                                </svg>
                                <span class="ms-1">想換工作了</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-full sm:w-4/12 px-2">
                        <div class="flex flex-col justify-center items-start">
                            <div class="w-full bg-stone-200 py-2 px-5 text-xs text-stone-600 rounded"> 
                                <pre><code>
&#060;card 
    &#058;cate&#061;&#034;cate&#034; 
    &#058;title&#061;&#034;title&#034; 
    &#058;company&#061;&#034;company&#034; 
    &#058;overtime&#061;&#034;overtime&#034; 
    &#058;feeling&#061;&#034;feeling&#034; &#062;
&#060;&#047;card&#062;

套件路徑: @/components/card.vue
參數說明:
    cate: 
        類型, 傳入 String , 選項如下
            'new':最新
            'top':精選
    title: 
        職位, 傳入 String
    company: 
        公司, 傳入 String
    overtime: 
        加班狀況, 傳入 String , 選項如下
            '1':準時上下班;
            '2':很少加班;
            '3':偶爾加班;
            '4':常常加班;
            '5':賣肝拼經濟
    feeling: 
        上班心情, 傳入 String , 選項如下
            '1':非常開心;
            '2':還算愉快;
            '3':平常心;
            '4':有苦說不出;
            '5':想換工作了
                            </code></pre>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-2 border-b-2 border-stone-300 py-10 ">
                    <div class="w-full sm:w-2/12 px-2">
                        <h4 class="h4 ms-10">Tag</h4>
                    </div>
                    <div class="w-full sm:w-6/12 px-2">
                        <div class="flex flex-row justify-center items-start ">
                            <tag class="me-2" content="年前跳槽"></tag>
                            <tag class="me-2" content="臺灣平均薪資"></tag>
                            <tag class="me-2" content="2023連假"></tag>
                            <tag class="me-2" content="真薪話數據調查"></tag>
                            <tag class="me-2" content="2023基本工資"></tag>
                        </div>
                    </div>
                    <div class="w-full sm:w-4/12 px-2">
                        <div class="flex flex-col justify-center items-start">
                            <div class="w-full bg-stone-200 py-2 px-5 text-xs text-stone-600 rounded"> 
                                <pre><code>
&#060;tag &#058;content&#061;&#034;content&#034;&#062;&#060;&#047;tag&#062;

套件路徑: @/components/tag.vue
參數說明:
    content: 
        文字內容, 傳入 String
                            </code></pre>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-2 border-b-2 border-stone-300 py-10 ">
                    <div class="w-full sm:w-2/12 px-2">
                        <h4 class="h4 ms-10">Text Link</h4>
                    </div>
                    <div class="w-full sm:w-6/12 px-2">
                        <div class="flex flex-row justify-center items-start ">
                            <div>
                                <text-link class="mb-2" content="資訊科技"></text-link>
                                <text-link class="mb-2 w-[350px]" content="7-11_統一超商股份有限公司" end-content="12323 筆"></text-link>
                                <text-link class="mb-2" content="美光薪資結構"></text-link>
                            </div>
                        </div>
                    </div>
                    <div class="w-full sm:w-4/12 px-2">
                        <div class="flex flex-col justify-center items-start">
                            <div class="w-full bg-stone-200 py-2 px-5 text-xs text-stone-600 rounded"> 
                                <pre><code>
&#060;text-link 
    &#058;content&#061;&#034;content&#034; 
    &#058;end-content&#061;&#034;end-content&#034;&#062;
&#060;&#047;text-link&#062;

套件路徑: @/components/textLink.vue
參數說明:
    content: 
        文字內容, 傳入 String      
    end-content: 
        結尾文字內容, 傳入 String, 非必填
                            </code></pre>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-2 border-b-2 border-stone-300 py-10 ">
                    <div class="w-full sm:w-2/12 px-2">
                        <h4 class="h4 ms-10">Footer</h4>
                    </div>
                    <div class="w-full sm:w-6/12 px-2">
                        <div class="flex flex-row justify-center items-start ">
                            <div class="flex flex-col">
                                <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-2">服務條款</a>
                                <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-2">隱私權政策</a>
                                <a href="#" class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out">幫助中心</a>
                            </div>
                        </div>
                    </div>
                    <div class="w-full sm:w-4/12 px-2">
                        <div class="flex flex-col justify-center items-start">
                            <div class="w-full bg-stone-200 py-2 px-5 text-xs text-stone-600 rounded "> 
                                <pre class="overflow-x-scroll"><code>
&#060;a href&#061;&#034;#&#034; class&#061;&#034;caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out&#034; &#062;
服務條款
&#060;&#047;a&#062;

非套件                                
                            </code></pre>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-2 border-b-2 border-stone-300 py-10 ">
                    <div class="w-full sm:w-2/12 px-2">
                        <h4 class="h4 ms-10">Search</h4>
                    </div>
                    <div class="w-full sm:w-6/12 px-2">
                        <div class="flex flex-row justify-center items-start ">
                            <div class="flex border-2 hover:shadow-search transition duration-150 ease-in-out">
                                <input class="w-full border border-slate-400 px-2 text-black-10 placeholder-black-3  focus:outline-none " type="text" placeholder="搜尋薪水、公司、職位..." />
                                <button class="flex justify-center items-center bg-black-10">
                                    <svg width="84" height="48" viewBox="0 0 84 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0H84V48H0V0Z" fill="#2B2B31"/>
                                        <path d="M32.8398 22.6699C32.8398 23.7181 33.0352 24.7012 33.4258 25.6191C33.8164 26.5371 34.36 27.3444 35.0566 28.041C35.7533 28.7376 36.5573 29.2812 37.4688 29.6719C38.3867 30.0625 39.3698 30.2578 40.418 30.2578C41.1797 30.2578 41.9023 30.1504 42.5859 29.9355C43.2695 29.7207 43.9043 29.4212 44.4902 29.0371L48.6113 33.1582C48.7546 33.3014 48.9173 33.4056 49.0996 33.4707C49.2884 33.5423 49.4805 33.5781 49.6758 33.5781C49.9622 33.5781 50.2161 33.5098 50.4375 33.373C50.6589 33.2428 50.8346 33.0638 50.9648 32.8359C51.0951 32.6146 51.1602 32.3639 51.1602 32.084C51.1602 31.8887 51.1243 31.6999 51.0527 31.5176C50.9811 31.3353 50.877 31.1725 50.7402 31.0293L46.6582 26.9375C47.0814 26.332 47.4102 25.668 47.6445 24.9453C47.8854 24.2227 48.0059 23.4642 48.0059 22.6699C48.0059 21.6283 47.8073 20.6484 47.4102 19.7305C47.0195 18.8125 46.4759 18.0085 45.7793 17.3184C45.0892 16.6217 44.2852 16.0749 43.3672 15.6777C42.4492 15.2806 41.4661 15.082 40.418 15.082C39.3698 15.082 38.3867 15.2806 37.4688 15.6777C36.5573 16.0749 35.7533 16.6217 35.0566 17.3184C34.36 18.0085 33.8164 18.8125 33.4258 19.7305C33.0352 20.6484 32.8398 21.6283 32.8398 22.6699ZM34.959 22.6699C34.959 21.9147 35.099 21.2083 35.3789 20.5508C35.6654 19.8932 36.0592 19.3138 36.5605 18.8125C37.0618 18.3112 37.6413 17.9206 38.2988 17.6406C38.9564 17.3607 39.6628 17.2207 40.418 17.2207C41.1732 17.2207 41.8796 17.3607 42.5371 17.6406C43.1947 17.9206 43.7741 18.3112 44.2754 18.8125C44.7767 19.3138 45.1673 19.8932 45.4473 20.5508C45.7337 21.2083 45.877 21.9147 45.877 22.6699C45.877 23.4251 45.7337 24.1348 45.4473 24.7988C45.1673 25.4564 44.7767 26.0358 44.2754 26.5371C43.7741 27.0319 43.1947 27.4225 42.5371 27.709C41.8796 27.9889 41.1732 28.1289 40.418 28.1289C39.6628 28.1289 38.9564 27.9889 38.2988 27.709C37.6413 27.4225 37.0618 27.0319 36.5605 26.5371C36.0592 26.0358 35.6654 25.4564 35.3789 24.7988C35.099 24.1348 34.959 23.4251 34.959 22.6699Z" fill="#FFFEFD"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="w-full sm:w-4/12 px-2">
                        <div class="flex flex-col justify-center items-start">
                            <div class="w-full bg-stone-200 py-2 px-5 text-xs text-stone-600 rounded"> 
                                <pre class="overflow-x-scroll"><code>
&#060;div class&#061;"flex border-2 hover:shadow-search transition duration-150 ease-in-out"&#062;
	&#060;input class&#061;"w-full border border-slate-400 px-2 text-black-10 placeholder-black-3  focus:outline-none " type&#061;"text" placeholder&#061;"搜尋薪水、公司、職位..." /&#062;
	&#060;button class&#061;"flex justify-center items-center bg-black-10"&#062;
		&#060;svg width&#061;"84" height&#061;"48" viewBox&#061;"0 0 84 48" fill&#061;"none" xmlns&#061;"http://www.w3.org/2000/svg"&#062;
			&#060;path d&#061;"M0 0H84V48H0V0Z" fill&#061;"#2B2B31"/&#062;
			&#060;path d&#061;"M32.8398 22.6699C32.8398 23.7181 33.0352 24.7012 33.4258 25.6191C33.8164 26.5371 34.36 27.3444 35.0566 28.041C35.7533 28.7376 36.5573 29.2812 37.4688 29.6719C38.3867 30.0625 39.3698 30.2578 40.418 30.2578C41.1797 30.2578 41.9023 30.1504 42.5859 29.9355C43.2695 29.7207 43.9043 29.4212 44.4902 29.0371L48.6113 33.1582C48.7546 33.3014 48.9173 33.4056 49.0996 33.4707C49.2884 33.5423 49.4805 33.5781 49.6758 33.5781C49.9622 33.5781 50.2161 33.5098 50.4375 33.373C50.6589 33.2428 50.8346 33.0638 50.9648 32.8359C51.0951 32.6146 51.1602 32.3639 51.1602 32.084C51.1602 31.8887 51.1243 31.6999 51.0527 31.5176C50.9811 31.3353 50.877 31.1725 50.7402 31.0293L46.6582 26.9375C47.0814 26.332 47.4102 25.668 47.6445 24.9453C47.8854 24.2227 48.0059 23.4642 48.0059 22.6699C48.0059 21.6283 47.8073 20.6484 47.4102 19.7305C47.0195 18.8125 46.4759 18.0085 45.7793 17.3184C45.0892 16.6217 44.2852 16.0749 43.3672 15.6777C42.4492 15.2806 41.4661 15.082 40.418 15.082C39.3698 15.082 38.3867 15.2806 37.4688 15.6777C36.5573 16.0749 35.7533 16.6217 35.0566 17.3184C34.36 18.0085 33.8164 18.8125 33.4258 19.7305C33.0352 20.6484 32.8398 21.6283 32.8398 22.6699ZM34.959 22.6699C34.959 21.9147 35.099 21.2083 35.3789 20.5508C35.6654 19.8932 36.0592 19.3138 36.5605 18.8125C37.0618 18.3112 37.6413 17.9206 38.2988 17.6406C38.9564 17.3607 39.6628 17.2207 40.418 17.2207C41.1732 17.2207 41.8796 17.3607 42.5371 17.6406C43.1947 17.9206 43.7741 18.3112 44.2754 18.8125C44.7767 19.3138 45.1673 19.8932 45.4473 20.5508C45.7337 21.2083 45.877 21.9147 45.877 22.6699C45.877 23.4251 45.7337 24.1348 45.4473 24.7988C45.1673 25.4564 44.7767 26.0358 44.2754 26.5371C43.7741 27.0319 43.1947 27.4225 42.5371 27.709C41.8796 27.9889 41.1732 28.1289 40.418 28.1289C39.6628 28.1289 38.9564 27.9889 38.2988 27.709C37.6413 27.4225 37.0618 27.0319 36.5605 26.5371C36.0592 26.0358 35.6654 25.4564 35.3789 24.7988C35.099 24.1348 34.959 23.4251 34.959 22.6699Z" fill&#061;"#FFFEFD"/&#062;
		&#060;/svg&#062;
	&#060;/button&#062;
&#060;/div&#062;

非套件
                            </code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            h1Code: '<h1>Title / H1</h1>',
            h2Code: '<h2>Title / H2</h2>',
            h3Code: '<h3>Title / H3</h3>',
            h4Code: '<h4>Title / H4</h4>',
            h5Code: '<h5>Title / H5</h5>',
            h6Code: '<h6>Title / H6</h6>',
            bodyCode: '<div class="body">Title / Body.20</div>',
            bodySmCode: '<div class="body-sm">Title / Body.16</div>',
            captionCode: '<div class="caption">Title / Caption</div>',
        }
    }
}
</script>