import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('users');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/search`,
        {
          // 경로는 실제 API 경로에 따라 변경
          params: {
            q: query,
            category,
          },
          withCredentials: true,
        }
      );

      setResults(response.data);
    } catch (error) {
      // console.error('검색 에러:', error);
      alert('검색 중 에러가 발생했습니다.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="users">유저</option>
        <option value="posts">내용</option>
        <option value="tags">태그</option>
      </select>
      <button onClick={handleSearch}>검색</button>
      <div>
        {results.map((result, index) => (
          <div key={index}>
            {/* 결과 표시. 카테고리별로 다른 구조를 가질 수 있으므로 조건부 렌더링이 필요할 수 있음 */}
            {JSON.stringify(result)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
