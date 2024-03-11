/**
 * 所有 JSON 数据的请求
*/

// index.html 的 JSON 数据请求
export function fetchArticleData() {
        return fetch('data/article.json')
                .then(response => response.json())
                .catch(error => console.error('Error:', error));
}