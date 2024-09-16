/**
 * 所有 JSON 数据的请求
*/

// index.html 的 JSON 数据请求
export function fetchArticleData() {
        return fetch('data/article.json')
                .then(response => response.json())
                .catch(error => console.error('Error:', error));
}

// export async function fetchArticleData() {
//         try {
//             const response = await fetch('data/article.json');
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error:', error);
//         }
// }

// index.html 的 JSON 数据请求 （服务器）
// export function fetchArticleData() {
//         return fetch('http://localhost:8080/test.php')
//                 .then(response => response.json())
//                 .catch(error => console.error('Error:', error));
// }