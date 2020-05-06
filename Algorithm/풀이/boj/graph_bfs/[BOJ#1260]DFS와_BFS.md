# 백준 알고리즘 1260번 - DFS와 BFS

- [https://www.acmicpc.net/problem/1260](https://www.acmicpc.net/problem/1260)
-   사용 언어: Java

## 문제

그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

## 입력

첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.

## 출력
 
첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.

## 풀이 

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

// https://www.acmicpc.net/problem/1260
public class BOJ1260 {

  private static ArrayList<Integer>[] graph;
  private static boolean[] check;
  
  private static void dfs(int start) {
    if(check[start])	return;
    
    check[start] = true;
    System.out.print(start + " ");
    
    for(int i : graph[start]) {
      if(!check[i])	dfs(i);
    }
  }
  
  private static void bfs(int start) {
    Queue<Integer> q = new LinkedList<>();
    
    check[start] = true;
    q.add(start);
    
    int next;
    while(!q.isEmpty()) {
      next = q.poll();
      System.out.print(next + " ");
      
      for(int i : graph[next]) {
        if(check[i] != true) {
          check[i] = true;
          q.add(i);
        }
      }
    }
  }
  
  public static void main(String[] args) {
    
    Scanner sc = new Scanner(System.in);
    
    int n = sc.nextInt();
    int m = sc.nextInt();
    int start = sc.nextInt();
    
    graph = new ArrayList[n+1];
    
    for(int i = 1; i <= n; ++i) {
      graph[i] = new ArrayList<Integer>();
    }
    
    int a, b;
    for(int i = 0; i < m; ++i) {
      a = sc.nextInt();
      b = sc.nextInt();
      graph[a].add(b);
      graph[b].add(a);
    }
    
    for(int i = 1; i <= n; ++i) {
      Collections.sort(graph[i]);
    }
    
    check = new boolean[n+1];
    dfs(start);
    System.out.println("");
    
    check = new boolean[n+1];
    bfs(start);
    System.out.println("");
    
  }
  
}
```

## 풀이시 유의사항

그래프의 탐색 방법인 DFS와 BFS를 구현하는 방법에 대한 문제. 이후 최단 거리 탐색 등 그래프와 관련된 문제를 푸는 기반이 되는 문제이므로, 그래프의 표현 방법과 검색 방법에 유의하며 풀어볼 필요가 있다.

정점 번호가 작은 것을 먼저 방문해야 하는 조건이 있으므로 탐색을 수행하기 전에 정렬을 수행하도록 한다.
