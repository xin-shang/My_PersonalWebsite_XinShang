import{ fetchArticleData } from './fetchData.js';

// 函数用于更新语言文件
function updateLanguageFiles(data) {
        const mappings = {
                userName_en: ["header", "user_name"],
                userRole_en: ["header", "user_role"],
                homeTitle_en: ["main", "home_title"],
                homeSubtitle_en: ["main", "home_subtitle"],
                homeDescription_en: ["main", "home_description"],
                introduceDescription_en: ["main", "introduce_description"],

                userName_zh: ["header", "user_name"],
                userRole_zh: ["header", "user_role"],
                homeTitle_zh: ["main", "home_title"],
                homeSubtitle_zh: ["main", "home_subtitle"],
                homeDescription_zh: ["main", "home_description"],
                introduceDescription_zh: ["main", "introduce_description"],
        };
    
        // 加载当前语言文件
        const lang = document.documentElement.lang; // lang属性决定当前语言

        fetch(`assets/language/${lang}.json`)
                .then(response => response.json())
                .then(languageData => {

                        // 遍历mappings，更新语言文件中的数据
                        Object.keys(mappings).forEach(key => {
                                const path = mappings[key];
                                if (key.endsWith(`_${lang}`)) {
                                        const [section, field] = path;
                                        languageData[section][field] = data[key];
                                }
                        });

                        // 
                        mappingPage(languageData);
        });
}

// 
function switchLanguage(lang) {
        // 更新 document 的 lang 属性
        document.documentElement.lang = lang;

        // 使用fetchArticleData函数获取article.json中的数据，然后更新语言文件
        fetchArticleData().then(articleData => {
                updateLanguageFiles(articleData);
        });
}

// 
function mappingPage(languageData) {

        // 反映到页面上的示例
        const currentMonthIndex = new Date().getMonth();        // 获取并更新当前月份
        const monthSpan = document.querySelector('.home__recent-month');
        
        if (monthSpan) {
                monthSpan.textContent = languageData.months[currentMonthIndex];
        }

        // 因为使用了嵌套对象的方法
        document.querySelectorAll('[data-key]').forEach(el => {
                const section = el.dataset.section; // 每个元素还有一个 data-section 属性
                const key = el.getAttribute('data-key');
                el.textContent = languageData[section][key];
        });
}
      
// 当页面加载完成时设置默认语言
document.addEventListener('DOMContentLoaded', () => {
        switchLanguage('en'); // 或者根据用户偏好设置语言
        const langE = document.getElementById('english_btn');
        const langZ = document.getElementById('chinese_btn');
        
        langE.classList.add('active-select'); // 
        document.getElementById('english_btn').disabled = true; // 禁用

        if(langE) {
                langE.addEventListener('click', () => {
                        switchLanguage('en');
                        langE.classList.add('active-select');
                        langZ.classList.remove('active-select');
                        document.getElementById('english_btn').disabled = true;         // 禁用
                        document.getElementById('chinese_btn').disabled = false;        // 解禁
                });
        }
              
        if(langZ) {
                langZ.addEventListener('click', () => {
                        switchLanguage('zh');
                        langZ.classList.add('active-select');
                        langE.classList.remove('active-select');
                        document.getElementById('chinese_btn').disabled = true;         // 禁用
                        document.getElementById('english_btn').disabled = false;        // 解禁
                });
        }
});