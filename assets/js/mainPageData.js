import{ fetchArticleData } from './fetchData.js';

/**
 * 用户数据
*/
async function userContent(data) {
        updateItem('user-name', data.userName_en);
        updateItem('user-role', data.userRole_en);
        updateItem('user-facebook', data.facebookURL);
        updateItem('user-douyin', data.douyinURL);
        updateItem('user-bilibili', data.bilibiliURL);
};


/**
 * 主页数据
 * , activityDataMain
*/
async function homeContent(data) {
        updateItem('home-title', data.homeTitle_en);
        updateItem('home-subtitle', data.homeSubtitle_en);
        updateItem('home-description', data.homeDescription_en);
        updateItem('home-view-num', data.views);
        updateItem('home-project-num', data.projects);
        updateItem('home-article-num', data.articles);
};


/**
 * 介绍数据
*/
async function introduceContent(data) {
        updateItem('introduce-description', data.introduceDescription_en);

        data.educationList.forEach(async (item, index) => {
                await addTemplate('#education_box', 'education_content-list', '.education__item', 'education_item', index);

                const educationItem = document.getElementById('education_content-list')
                                                .querySelector(`#education_item-${index}`);

                updateItem_local(educationItem, '#university-name', item.educationName);
                updateItem_local(educationItem, '#university-location', item.educationLocation);
                updateItem_local(educationItem, '#university_major', item.educationMajor);
                updateItem_local(educationItem, '#university_major-branch', item.educationMajorBranch);
                updateItem_local(educationItem, '#university-date', item.educationDate);
        });

        data.jobList.forEach(async (item, index) => {
                await addTemplate('#job_box', 'job_content-list', '.job__item', 'job_item', index);

                const jobItem = document.getElementById('job_content-list')
                                                .querySelector(`#job_item-${index}`);
                
                updateItem_local(jobItem, '#company-name', item.companyName);
                updateItem_local(jobItem, '#company-location', item.companyLocation);
                updateItem_local(jobItem, '#company-project-name', item.companyProject);
                updateItem_local(jobItem, '#company-project-detail', item.jobContent);
                updateItem_local(jobItem, '#working-date', item.jobDate);
        });
}


/**
 * 技能数据
*/
async function skillsContent(data) {
        data.skillList.forEach(async (group, index) => {
                await addTemplate('#skills_box', 'skills_boxList', '.skills__item-box', 'skills_item-box', index);
                
                const skillGroupItem = document.getElementById('skills_boxList')
                                                .querySelector(`#skills_item-box-${index}`);
                
                updateItem_local(skillGroupItem, '#skillGroup_name', group.skillTitle);

                const skillGroupSkillList = skillGroupItem.querySelector('.skills__detailList');

                group.skillItemList.forEach(async (item, index) => {
                        await addTemplateListValue('#skill-detail-box', skillGroupSkillList, '.skills__detail-item', 'skill-detail-item', index);

                        const singleSkill = skillGroupItem.querySelector(`#skill-detail-item-${index}`);

                        updateItem_local(singleSkill, '#skills-name', item.skillName);
                        updateItem_local(singleSkill, '#skills-level', item.skillLevel);
                });
        });

}


/**
 * 项目
*/
async function projectsContent(data) {
        let promises = [];
        await addTemplate('#projects_box-filters', 'project_filters');
        
        data.projectList.forEach(async (item, index) => {

                let promise = addTemplate('#project_box', 'projects_card-list', '.project__card', 'project-card', index)
                .then(() => {
                        const projectItem = document.getElementById('projects_card-list')
                                                        .querySelector(`#project-card-${index}`);

                        projectItem.classList.add(item.projectCategory);

                        updateItem_local(projectItem, '#project-name', item.projectName);
                        updateItem_local(projectItem, '#project-time', item.projectTime);
                        updateItem_local(projectItem, '#project-detail', item.projectDetail);
        
                        projectItem.querySelector('#project-img').src = item.projectImgURL;

                        const tagList = projectItem.querySelector('#project_tag-list');
                        
                        item.projectTagList.forEach((tagName) => {
                                updateTagList('#', 'concent__tag_item', tagName, tagList);
                        });
                });

                promises.push(promise);
        });

        await Promise.all(promises);            // 等待所有项目内容的添加完成
}


/**
 * 博客数据
*/
async function blogContent(data) {
        data.blogList.forEach(async (item, index) => {
                
                await addTemplate('#blog_box', 'blogs_list', '.blog__item', 'blog_item', index); // 加模版。 await 确保模板添加完成后再进行下面的

                // 寻址
                const blogItem = document.getElementById('blogs_list')
                                                .querySelector(`#blog_item-${index}`);

                // 数据覆盖
                updateItem_local(blogItem, '#category-name', item.blogCategory);
                updateItem_local(blogItem, '#concent-date', item.blogCreateDate);
                updateItem_local(blogItem, '#concent_title', item.blogTitle);

                // 标签列表
                const tagList = blogItem.querySelector('#concent-tag-list');
                item.blogTagList.forEach((tagName) => {
                        updateTagList('#', 'concent__tag_item', tagName, tagList);
                });
        });
}


/**
 * 异步 覆盖单个数据
 * @param {string} elementId - 要更新内容的元素的 ID
 * @param {string} content - 要设置的内容
*/
async function updateItem(elementId, content) {
        const element = document.getElementById(elementId);
        if (element) {
                element.textContent = content;
        }
}


/**
 * 异步 覆盖单个数据（局部）
 * @param {HTMLElement} fatherId - 父元素，要在其下查找目标元素
 * @param {string} elementId - 要更新的元素的 ID 或选择器
 * @param {string} content - 要设置的内容
*/
async function updateItem_local(fatherId, elementId, content) {
        const element = fatherId.querySelector(elementId);
        if (element) {
                element.textContent = content;
        }
}


/**
 * 异步 覆盖标签列表数据
 * @param {string} hrefName - 标签链接地址，格式为 '#xxx'
 * @param {string} tagClass - 标签的类名，用于设置 <a> 元素的 class 属性
 * @param {string} tagName - 标签的文本内容
 * @param {HTMLElement} tagList - 包含标签的父元素，通常是一个 <ul> 或 <div>
*/
async function updateTagList(hrefName, tagClass, tagName, tagList) {
        var tagItem = document.createElement('a');      // 创建一个 <a> 组件
        tagItem.href = hrefName;                        // 设置链接地址，如果每个标签的链接不同，可以在JSON中添加相应的数据
        tagItem.className = tagClass;
        tagItem.textContent = tagName;                  // 设置链接文本为标签名
        tagList.appendChild(tagItem);                   // 将创建的标签添加到页面上
}


/**
 * 添加列表内容
 * 异步 用于向指定内容列表中添加模板。
 * @param {string} templateId           - 要克隆的模板的 ID。
 * @param {string} contentListId        - 要添加模板的内容列表的 ID。
 * @param {string} itemClass            - 模板中要克隆的项的类名。
 * @param {string} itemId               - 克隆出的项的 ID 的基础部分。
 * @param {number} index                - 克隆出的项的索引。
*/
async function addTemplate(templateId, contentListId, itemClass, itemId, index) {
        const response = await fetch('templates.html');                         // 请求文件一次
        const text = await response.text();                                     // 解析文件内容为文本
        const html = new DOMParser().parseFromString(text, 'text/html');        // 获取文本内容为 HTMLDocument 对象
        const template = html.querySelector(templateId);                        // 根据提供的ID获取模板
        const contentList = document.getElementById(contentListId);             // 根据提供的ID获取内容列表
        
        const clone = document.importNode(template.content, true);              // 克隆模板
        const targetItem = clone.querySelector(itemClass);
        if(targetItem){
                targetItem.id = `${itemId}-${index}`;                             // 修改克隆出的节点中的元素 ID
        }

        contentList.appendChild(clone);                                         // 将克隆的模板添加到内容列表
}


/**
 * 添加列表内容
 * 异步 用于向指定内容列表中添加模板。
 * @param {string} templateId           - 要克隆的模板的 ID。
 * @param {string} contentListId        - 要添加模板的内容列表的 ID。
 * @param {string} itemClass            - 模板中要克隆的项的类名。
 * @param {string} itemId               - 克隆出的项的 ID 的基础部分。
 * @param {number} index                - 克隆出的项的索引。
*/
async function addTemplateListValue(templateId, contentList, itemClass, itemId, index) {
        const response = await fetch('templates.html');                         // 请求文件一次
        const text = await response.text();                                     // 解析文件内容为文本
        const html = new DOMParser().parseFromString(text, 'text/html');        // 获取文本内容为 HTMLDocument 对象
        const template = html.querySelector(templateId);                        // 根据提供的ID获取模板
        
        const clone = document.importNode(template.content, true);              // 克隆模板
        const targetItem = clone.querySelector(itemClass);
        if(targetItem){
                targetItem.id = `${itemId}-${index}`;                           // 修改克隆出的节点中的元素 ID
        }

        contentList.appendChild(clone);                                         // 将克隆的模板添加到内容列表
}


/**
 * 
*/
function setUpLinkWork() {
        const linkWork = document.querySelectorAll('.project__item');
    
        function activeWork() {
                linkWork.forEach(l => l.classList.remove('active-project'));
                this.classList.add('active-project');
        }
    
        linkWork.forEach(l => l.addEventListener('click', activeWork));
}


/**
 * 
*/
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


fetchArticleData().then(async data => {
        await homeContent(data);      //因为要和滚动逻辑结合一时半会儿应该搞不定，暂时搁置。      , activityDataMain
        introduceContent(data);
        skillsContent(data);

        await projectsContent(data);
        blogContent(data);

        
        window.isDataLoaded = true;                                                     // 数据加载完成，网页动效可以运行了
        sessionStorage.setItem('activityList', JSON.stringify(data.activityList));
        document.dispatchEvent(new CustomEvent('dataLoaded'));                          // 数据加载完成后，触发自定义事件

        initializeMixitup();                                                            // 在所有内容加载后初始化筛选器转换和项目选择器
        setUpLinkWork();                                                                // 假设这是你为 .project__item 设置点击事件的函数
});