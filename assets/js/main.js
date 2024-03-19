/**
 * 搜索
*/ 
const search = document.getElementById('search'),
        searchBtn = document.getElementById('search-button'),
        searchClose = document.getElementById('search-close');

searchBtn.addEventListener('click', () => {
        search.classList.add('show-search');
});

searchClose.addEventListener('click', () => {
        search.classList.remove('show-search');
});


/**
 * 设置
*/ 
const setting = document.getElementById('sitting'),
        settingBtn = document.getElementById('setting-button'),
        settingClose = document.getElementById('setting-close');

settingBtn.addEventListener('click', () => {
        setting.classList.add('show-search');
});

settingClose.addEventListener('click', () => {
        setting.classList.remove('show-search');
});


/**
 * 菜单
*/ 
const navMenu = document.getElementById('nav-menu'),
        navMenuIcon = document.getElementById('nav-menu-icon'),
        navClose = document.getElementById('nav-close')

// 显示菜单 验证是否存在常量
if(navMenuIcon) {
        navMenuIcon.addEventListener('click', () => {
                navMenu.classList.add('show__menu')
        })
}

// 隐藏菜单
if(navClose) {
        navClose.addEventListener('click', () => {
                navMenu.classList.remove('show__menu')
        })
}
    

/**
 * 头部透明
*/ 
function blurHeader() {
        const header = document.getElementById('header');
        window.scrollY >= 50    ? header.classList.add('blur-header') 
                                : header.classList.remove('blur-header');
}
window.addEventListener('scroll', blurHeader);


/**
 * 内容 - 技能 - 滑动框
*/ 
let swiperTestimonial = new Swiper(".skills__silderBox", {
        spaceBetween: 24,
        loop: true,
        grabCursor: true,

        pagination: {
                el: ".swiper-pagination",
                clickable: true,
        },

        breakpoints: {
                136: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                },
                562: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                },
                1020: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                },
        }
});


/**
 * 内容 - 邮件 - 发送消息
*/
const contactFrom = document.getElementById('contact-form'),
        contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
        e.preventDefault();     // 阻止事件的默认行为，阻止表单提交到URL

        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_rlixuu7', 'template_jt886hn', '#contact-form', 'V6FBN_0TTq3qaYc3F')
        .then(() => {
                contactMessage.textContent = 'Message sent successfully';               // 显示已发送消息
        }, () => {
                contactMessage.textContent = 'Message not sent (service error)';        // 显示未发送消息
        })
}

contactFrom.addEventListener('submit', sendEmail);



/**
 * 其他隐藏菜单
 * 通过点击导航栏子项，隐藏菜单。通过点击菜单外部，隐藏菜单
*/ 
document.addEventListener('click', function(e) {
        // 检查点击事件的目标是否为菜单或菜单图标的一个子元素  // 并且菜单是显示的
        if (!navMenu.contains(e.target) && !navMenuIcon.contains(e.target) && navMenu.classList.contains('show__menu')) {
                navMenu.classList.remove('show__menu');         // 如果不是，移除show__menu类，以隐藏菜单
        }
});



/**
 * 屏幕位置 & 菜单子项
 * 据现在的屏幕位置来确定菜单子项的高亮，点击菜单子项移动到屏幕相应位置
*/ 
document.addEventListener('DOMContentLoaded', function() {
        const sections = document.querySelectorAll('section[id]');
    
        // 平滑滚动到对应部分
        const scrollSmoothlyToSection = () => {
                const navLinks = document.querySelectorAll('.nav__menu a[href*="#"]'); // 获取所有导航链接
        
                navLinks.forEach(link => {
                        link.addEventListener('click', function(e) {
                                e.preventDefault(); // 阻止默认点击事件
                                const href = this.getAttribute('href');
                                const offsetTop = document.querySelector(href).offsetTop;
                
                                window.scroll({
                                        top: offsetTop,
                                        behavior: "smooth"
                                });
                        });
                });
        };
    
        // 滚动时动态更改链接激活状态
        const scrollActive = () => {
                const scrollY = document.documentElement.scrollTop || document.documentElement.scrollTop;
        
                sections.forEach(current => {
                        const sectionHeight = current.offsetHeight,
                        sectionTop = current.offsetTop - 50, // 根据实际情况调整，考虑导航栏高度
                        sectionId = current.getAttribute('id');
        
                        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                                document.querySelector('.nav__menu a[href*="' + sectionId + '"]').classList.add('active-link');
                        } else {
                                document.querySelector('.nav__menu a[href*="' + sectionId + '"]').classList.remove('active-link');
                        }
                });
        };
    
        // 初始化函数
        scrollSmoothlyToSection();
        window.addEventListener('scroll', scrollActive);
});


/**
 * 显示一键向上
*/
function scrollUp() {
        const scrollUp = document.getElementById('scroll-up');
        window.scrollY >= 350   ? scrollUp.classList.add('show__scroll') 
                                : scrollUp.classList.remove('show__scroll');
}
window.addEventListener('scroll', scrollUp);


/**
 * 
*/
const scrollToTopButton = document.getElementById('scroll-up');
scrollToTopButton.addEventListener('click', function(e) {
        e.preventDefault();             // 阻止链接默认行为 (不进行跳转)

        window.scrollTo({
                top: 0,                 // 目标位置（页面顶部）
                behavior: 'smooth'      // 指定滚动行为为“平滑滚动”
        });
});





/**
 * 
*/
const storedArray = JSON.parse(sessionStorage.getItem('activityList')); // 应该加限制条件
const activitySumNum = storedArray.length;

let isFirstCall = true;

// 输出
outputItem(activitySumNum);

// 滚动，鼠标控制
document.addEventListener('DOMContentLoaded', function(){
        const box = document.getElementById('home_item-scrollbox');             // yi ge
        let scrollInterval;
        
        // 
        if(activitySumNum > 1) {
                // 鼠标悬停时停止滚动
                box.addEventListener('mouseenter', function() {
                        clearInterval(scrollInterval); 
                });
                
                // 鼠标移出时继续滚动
                box.addEventListener('mouseleave', function() {
                        startScroll(activitySumNum, storedArray); 
                });

                // 初始化滚动
                startScroll(activitySumNum, storedArray);
        }


        // 
        function startScroll(activitySumNum, storedArray) {
                scrollInterval = setInterval(function() {
                        checkContinuous(activitySumNum, storedArray);                            // yi ge
                        box.scrollTop += 1; // 每次调用滚动1像素s
                }, 20); // 调整这个值以改变滚动速度
        }


        // 保持循环的连续性
        async function checkContinuous(sumNum, storedArray) {
                const box = document.getElementById('home_item-scrollbox');     // yi ge
                const boxNum = box.clientHeight;

                // 判定是否是第一次调用 scrollMidNum
                let scrollMidNum;

                if (isFirstCall) {
                        scrollMidNum = 0;       // 如果是第一次调用，设置scrollMidNum为0
                        isFirstCall = false;    // 更新标志，以便下次调用不会进入这个分支
                } else {
                        scrollMidNum = box.scrollHeight / 2 - box.scrollTop;    // 非首次调用，使用计算结果
                }

                // scrollMidNum < boxNum 就添加
                if(scrollMidNum < boxNum){     
                        loopActivityList(storedArray);
                        createEmptyBlogItem()
                        
                        const blogItems = box.getElementsByClassName('blog__item') 
                        const blogItemNum = blogItems.length;
                        const eachGroupNum = sumNum + 1;

                        // 检查需不需要删除前面的子项
                        if(eachGroupNum * 2 < blogItemNum && blogItems[0]) {
                                for (let i = 0; i < eachGroupNum; i++) {
                                        blogItems[0].parentNode.removeChild(blogItems[0]);
                                }
                        }
                }
        }

        
        
});


// 异步输出列表内容
async function outputItem(sumNum) {
        if(sumNum === 0) {
                await addShowNothing(true);
        }if (sumNum === 1) {
                loopActivityList(storedArray);
                createEmptyBlogItem()
        } else {
                loopActivityList(storedArray);
                createEmptyBlogItem()
                loopActivityList(storedArray);
                createEmptyBlogItem()
                loopActivityList(storedArray);
                createEmptyBlogItem()
        }
}


// 
function loopActivityList(storedArray) {
        storedArray.forEach(activity => {
                const id = activity.activityId;
                const category = activity.activityCategory;
                const date = activity.activityCreateDate;
                const title = activity.activityTitle;
                const tags = activity.activityTagList;
                
                const item = createActivityItem(id, category, date, title, tags);
                
                document.getElementById('home_content-list').appendChild(item);
        });
}


// 异步无内容盒添加
async function addShowNothing(showNothing) {
        const response = await fetch('templates.html');                         // 请求文件
        const text = await response.text();                                     // 解析文件内容为文本
        const html = new DOMParser().parseFromString(text, 'text/html');        // 获取文本内容为 HTMLDocument 对象
        const template = html.querySelector('#show_nothing');                   // 

        const contentList = document.getElementById('home_content-list');
        const clone = template.content.cloneNode(true);

        if (showNothing) {
                const pElement = clone.querySelector('.home__recent_nothing');
                if (pElement) {
                        pElement.classList.add('show_nothing');
                };
        };

        contentList.appendChild(clone);
}


// 
function createEmptyBlogItem() {
        const blogItem = document.createElement('div');
        blogItem.className = 'blog__item';  
        document.getElementById('home_content-list').appendChild(blogItem);
}


// 
function createActivityItem(id, category, date, title, tags) {
        // 创建顶级容器
        const blogItem = document.createElement('div');
        blogItem.className = 'blog__item';
        blogItem.id = `blog_item-${id - 1}`;    // 可能真的调整成 id

        // 创建日期和分类的容器
        const categoryDate = document.createElement('div');
        categoryDate.className = 'category_date';

        const categoryLink = document.createElement('a');
        categoryLink.href = "#home";
        categoryLink.className = 'concent__category';
        
        const leftBracket = document.createElement('i');
        leftBracket.className = 'angle_bracket left_one ri-arrow-left-wide-line';
        
        const categoryName = document.createElement('p');
        categoryName.className = 'category__name';
        categoryName.id = 'category-name';
        categoryName.textContent = category;

        const rightBracket = document.createElement('i');
        rightBracket.className = 'angle_bracket right_one ri-arrow-right-wide-line';

        // 将分类名称和箭头添加到链接中
        categoryLink.appendChild(leftBracket);
        categoryLink.appendChild(categoryName);
        categoryLink.appendChild(rightBracket);

        // 创建并设置日期
        const dateP = document.createElement('p');
        dateP.className = 'concent__date';
        dateP.id = 'concent-date';
        dateP.textContent = date;

        // 将链接和日期添加到其容器中
        categoryDate.appendChild(categoryLink);
        categoryDate.appendChild(dateP);

        // 创建并设置标题
        const titleH3 = document.createElement('h3');
        titleH3.className = 'concent__title';
        titleH3.id = 'concent_title';
        titleH3.textContent = title;

        // 创建标签列表
        const tagListDiv = document.createElement('div');
        tagListDiv.className = 'concent__tag_list';
        tagListDiv.id = 'concent-tag-list';
        tags.forEach(tag => {
                const tagA = document.createElement('a');
                tagA.href = "#";
                tagA.className = 'concent__tag_item';
                tagA.textContent = tag;
                tagListDiv.appendChild(tagA);
        });

        // 将所有部分添加到顶级容器
        blogItem.appendChild(categoryDate);
        blogItem.appendChild(titleH3);
        blogItem.appendChild(tagListDiv);

        return blogItem;
}