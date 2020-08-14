Word Ladder
========

- 유형: Queue
- [https://leetcode.com/problems/word-ladder/](https://leetcode.com/problems/word-ladder/)
- 사용 언어: Java


## 문제

Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:

1. Only one letter can be changed at a time.
2. Each transformed word must exist in the word list.

Note:

- Return 0 if there is no such transformation sequence.
- All words have the same length.
- All words contain only lowercase alphabetic characters.
- You may assume no duplicates in the word list.
- You may assume beginWord and endWord are non-empty and are not the same.


## 풀이

```java
class Solution {
  public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    int ans = 0;

    if (!wordList.contains(endWord) || (beginWord.equals(endWord) && wordList.contains(endWord)) || wordList == null) {
      return ans;
    }

    Queue<String> queue = new LinkedList<>();
    Set<String> dict = new HashSet<>(wordList);

    queue.offer(beginWord);
    dict.remove(beginWord);

    while (!queue.isEmpty()) {
      if (queue.contains(endWord)) {
        ans++;
        break;
      }

      int size = queue.size();

      for (int i = 0; i < size; i++) {
        String word = queue.poll();

        for (int j = 0; j < word.length(); j++) {
          char[] curr = word.toCharArray();

          for (char k = 'a'; k <= 'z'; k++) {
            curr[j] = k;
            String trans = String.valueOf(curr);

            if (dict.contains(trans)) {
              queue.offer(trans);
              dict.remove(trans);
            }
          }
        }
      }
      
      if (queue.size() != 0) {
        ans++;
      }

    }

    return ans;
  }
}
```

- 시작 단어에서 마지막 단어로 변경하는데 몇 번 전환을 해야하는지 구하는 문제
- 한 번에 한 글자씩 바꿀 수 있다
- Set과 Queue를 이용하여 현재 바꿀 수 있는 단어 리스트와 변환하는 단계를 구함
  - Set에는 바꿀 수 있는 단어 리스트를 저장
  - Queue에는 바꿀 수 있는 단어가 있는 경우 저장
- 해당 단어를 한 자리마다 a부터 z까지 바꾸면서 Set에 있는지 확인 후 있다면 저장
- 한 사이클이 끝날 때마다 답을 1씩 늘림
