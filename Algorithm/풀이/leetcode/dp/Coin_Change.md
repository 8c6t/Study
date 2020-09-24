Coin Change
========

- 유형: DP
- [https://leetcode.com/problems/coin-change/](https://leetcode.com/problems/coin-change/)
- 사용 언어: Java


## 문제

You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

## 풀이

```java
class Solution {
  public int coinChange(int[] coins, int amount) {
    int max = amount + 1;
    int[] d = new int[max];
    Arrays.fill(d, max);
    d[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
      for (int coin : coins) {
        if (i >= coin) {
          d[i] = Math.min(d[i], d[i - coin] + 1);
        }
      }
    }
    
    return d[amount] > amount ? -1 : d[amount];
  }
}
```

- 총액을 주어진 동전들을 이용하여 만들되, 그 개수가 최소가 되도록 하는 문제
- 각 동전이 배수로 이루어진 경우에는 그리디로 풀이가 가능하지만, 그렇지 않은 경우에는 DP로 풀이를 해야 한다
- `d[i]`: i라는 금액을 만드는데 필요한 최소한의 동전 개수
  - i-coin 에서 동전 1개를 더 사용하여 i를 만들었을 때의 동전의 최소 개수
  - 해당 값을 만들 수 있는 동전의 최소값만을 메모이제이션 해나간다
