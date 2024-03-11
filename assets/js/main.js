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
    


/** ---------------------------------------------------------------------------------------------------------------------- **/ 
/** ---------------------------------------------------------------------------------------------------------------------- **/ 


/**
 * 头部透明
*/ 
const blurHeader = () => {
        const header = document.getElementById('header');
        this.scrollY >= 50      ? header.classList.add('blur-header') 
                                : header.classList.remove('blur-header');
}
window.addEventListener('scroll', blurHeader);


/** ---------------------------------------------------------------------------------------------------------------------- **/ 
/** ---------------------------------------------------------------------------------------------------------------------- **/ 

/**
 * 内容 - 主页 - 自动滚动框
 * 暂时不优化了
*/ 
// 变量
const sumBlogNum = 4;

// 异步加载博客盒
async function loadBlogBoxTemplate(contentItem) {
        const response = await fetch('templates.html');                         // 请求文件
        const text = await response.text();                                     // 解析文件内容为文本
        const html = new DOMParser().parseFromString(text, 'text/html');        // 获取文本内容为 HTMLDocument 对象
        const template = html.querySelector('#blog_box');                       // 

        // 将模板内容克隆并插入到指定位置
        contentItem.appendChild(template.content.cloneNode(true));
}

// 异步博客盒列表添加
async function loopBlogBox(sumNum) {
        const contentList = document.getElementById('home_content-list');
        for(let i = 0; i < sumNum; i++) {
                loadBlogBoxTemplate(contentList);
        }
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

let isFirstCall = true;

// 保持循环的连续性
function checkContinuous(sumNum) {
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
                loopBlogBox(sumBlogNum);                                // yi ge
                addTemplate('#scroll_more-space', 'home_content-list');
                
                const blogItems = box.getElementsByClassName('blog__item')         // yi ge
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

// 异步输出列表内容
async function outputItem(sumNum) {
        if(sumNum === 0) {
                await addShowNothing(true);
        }if (sumNum === 1) {
                loopBlogBox(sumBlogNum);
                addTemplate('#scroll_more-space', 'home_content-list');
        } else {
                loopBlogBox(sumBlogNum);
                addTemplate('#scroll_more-space', 'home_content-list');
                loopBlogBox(sumBlogNum);
                addTemplate('#scroll_more-space', 'home_content-list');
        }
}

// 输出
outputItem(sumBlogNum);

// 滚动，鼠标控制
document.addEventListener('DOMContentLoaded', function(){
        const box = document.getElementById('home_item-scrollbox');             // yi ge
        let scrollInterval;

        function startScroll() {
                scrollInterval = setInterval(function() {
                        checkContinuous(sumBlogNum);                            // yi ge
                        box.scrollTop += 1; // 每次调用滚动1像素s
                }, 20); // 调整这个值以改变滚动速度
        }
        
        if(sumBlogNum > 1) {
                // 鼠标悬停时停止滚动
                box.addEventListener('mouseenter', function() {
                        clearInterval(scrollInterval); 
                });
                
                // 鼠标移出时继续滚动
                box.addEventListener('mouseleave', function() {
                        startScroll(); 
                });

                // 初始化滚动
                startScroll();
        }
        
});


/** ---------------------------------------------------------------------------------------------------------------------- **/ 
/** ---------------------------------------------------------------------------------------------------------------------- **/ 

/**
 * 内容 - 介绍 - 普通滚动框
*/ 
// 变量
const sumEducationNum = 1;

// 现在暂时显示一组，以后可能要改为根据数据数量遍历
addTemplates('#education_box', 'education_content-list', 2);
addTemplates('#job_box', 'job_content-list', 2);


/**
 * 内容 - 技能 - 框
*/ 
// 这段代码重复率很高，完全体记得优化一下
addTemplates('#skills_box', 'skills_boxList', 3);

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
 * 内容 - 项目
*/ 
async function initProjectFilter() {
        await addTemplate('#projects_box-filters', 'project_filters');
        await addTemplates('#project_box', 'projects_card-list', 4); // 如果需要这个函数的话
    
        // 筛选器转换
        const linkWork = document.querySelectorAll('.project__item');
    
        function activeWork() {
                linkWork.forEach(l => l.classList.remove('active-project'));
                this.classList.add('active-project');
        }
    
        linkWork.forEach(l => l.addEventListener('click', activeWork));

        // 项目 - 选择器
        function initializeMixitup() {
                let mixer = mixitup('.projects__card-list', {
                        selectors: {
                                target: '.project__card'
                        },
                        animation: {
                                duration: 300
                        }
                });
        }
        initializeMixitup();
}
    
initProjectFilter();


/**
 * 内容 - 日志
*/ 
addTemplates('#blog_box', 'blogs_list', 8);


/**
 * 内容 - 邮件 - 发送消息
*/
const contactFrom = document.getElementById('contact-form'),
        contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
        e.preventDefault(); // 阻止事件的默认行为，阻止表单提交到URL

        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_rlixuu7', 'template_jt886hn', '#contact-form', 'V6FBN_0TTq3qaYc3F')
        .then(() => {
                // 显示已发送消息
                contactMessage.textContent = 'Message sent successfully';
        }, () => {
                // 显示未发送消息
                contactMessage.textContent = 'Message not sent (service error)';
        })
}

contactFrom.addEventListener('submit', sendEmail);


/**
 * 公用方法
*/ 
// 暂时只用这两个，但是以后可能要插入数据，到时候再想办法，是直接写方法带着数据变量 还是 先输出结构后插入数据
async function addTemplate(templateId, contentListId) {
        const response = await fetch('templates.html');                         // 请求文件一次
        const text = await response.text();                                     // 解析文件内容为文本
        const html = new DOMParser().parseFromString(text, 'text/html');        // 获取文本内容为 HTMLDocument 对象
        const template = html.querySelector(templateId);                        // 根据提供的ID获取模板
      
        const contentList = document.getElementById(contentListId);             // 根据提供的ID获取内容列表
        contentList.appendChild(template.content.cloneNode(true));              // 克隆模板并添加到内容列表
}

async function addTemplates(templateId, contentListId, count) {
        const response = await fetch('templates.html');                         // 请求文件一次
        const text = await response.text();                                     // 解析文件内容为文本
        const html = new DOMParser().parseFromString(text, 'text/html');        // 获取文本内容为 HTMLDocument 对象
        const template = html.querySelector(templateId);                        // 根据提供的ID获取模板
      
        const contentList = document.getElementById(contentListId);             // 根据提供的ID获取内容列表
        for (let i = 0; i < count; i++) {
                contentList.appendChild(template.content.cloneNode(true));      // 循环克隆模板并添加到内容列表
        }
}

/**
 * 显示一键向上
*/
const scrollUp = () => {
        const scrollUp = document.getElementById('scroll-up');
        this.scrollY >= 350 ? scrollUp.classList.add('show__scroll') 
                                : scrollUp.classList.remove('show__scroll');
}
window.addEventListener('scroll', scrollUp);

// 
const scrollToTopButton = document.getElementById('scroll-up');

scrollToTopButton.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止链接默认行为 (不进行跳转)

        window.scrollTo({
                top: 0,                 // 目标位置（页面顶部）
                behavior: 'smooth'      // 指定滚动行为为“平滑滚动”
        });
});