압축(Compression)
========

## Huffman Coding

- 문자 빈도수를 확률로 계산한 뒤, 낮은 수부터 차례대로 트리를 만들어가는 과정
- 두 문자의 등장 확률을 합한 값을 부모 노드로 사용
- Huffman coding 알고리즘은 트리들의 집합을 유지하면서 매 단계에서 가장 frequency가 작은 두 트리를 찾아 하나로 합친다
- 이러한 연산에 가장 적합한 자료구조는 최소 힙
- 힙에 저장된 각각의 원소들은 하나의 트리이다


## Prefix Code

- 어떤 codeword도 다른 codeword의 prefix가 되지 않는 코드
  - codeword: 하나의 문자에 부여된 이진코드를 말함
- 모호함이 없이 decode가 가능
- prefix code는 하나의 이진 트리로 표현 가능
  - 인코딩 할 모든 문자열이 leaf node가 됨


## Run-Length Encoding

- 런은 동일한 문자가 하나 혹은 그 이상 연속해서 나오는 것을 의미
  - s=aaabba일 때 aaa, bb, a 3개의 run으로 구성됨
- run-length encoding에서는 각각의 run을 그 "run을 구성하는 문자"와 와 "run의 길이의 순서쌍"으로 encoding 한다
  - 3a2b1a
- Run-Length Encoding은 길이가 긴 run 들이 많은 경우에 효과적
- 이미지 데이터(픽셀들의 집합)의 경우 유효한 편


## Huffman Method with Run-Length Encoding

- 파일을 구성하는 각각의 run들을 하나의 super-symbol로 본다. 이 super-symbol들에 대해서 Huffman coding을 적용
- 예를 들어 문자열 AAABAACCAABA는 5개의 super-symbol들(AAA, B, AA, CC)로 구성되며, 각 super-symbol의 등장 횟수는 다음과 같음
  - Symbol / Run Length / Frequency 
  - A: 3, 1
  - C: 2, 1
  - A: 1, 1
  - B: 1, 2
  - A: 2, 2k


### Run과 Frequency 찾기

- 압축할 파일을 처음부터 끝까지 읽어서 파일을 구성하는 run들과 각 run들의 등장 횟수를 구한다
- 먼저 각 run들을 표현할 하나의 클래스 class Run을 정의
  - 클래스 Run은 적어도 세 개의 데이터 멤버 symbol, runLen, 그리고 freq를 가져야 한다
  - symbol은 byte 타입이고, 나머지는 정수들이다
- 인식한 run들은 하나의 ArrayList에 저장한다
- 적절한 생성자와 equals 메서드를 구현한다
  - symbol과 runLen이 같은지 여부로
- 데이터 파일을 적어도 두 번 읽어야 한다. 한 번은 run들을 찾기 위해서, 그리고 다음은 실제로 압축을 수행하기 위해서
- 여기서는 RandomAccessFile을 이용하여 데이터 파일을 읽어본다

```java
/* 읽을 데이터 파일을 연다 */
RandomAccessFile fIn = new RandomAccessFile(fileName, "r");

/* 한 byte를 읽어 온다. 읽어온 byte는 0~255 사이의 정수로 반환된다 */
/* 파일의 끝에 도달하면 -1을 반환한다 */
int ch = fIn.read();

/* 필요하다면 byte로 casting 해서 저장한다 */
byte symbol = (byte) ch;
```

### Run 인식하기

1. 파일의 첫 byte를 읽고 이것을 start symbol이라고 한다
2. 파일의 끝에 도달하거나 혹은 start symbol과 다른 byte가 나올 때까지 연속해서 읽는다. 현재까지 읽은 byte수를 count라고 하자
3. (start_symbol, count - 1)인 run이 하나 인식되었다. 이 run을 저장하고 가장 마지막에 읽은 byte를 start_symbol로, count=1로 reset 하고 다시 반복한다


```java
public class HuffmanCoding {
  private List<Run> runs = new ArrayList<>();
  
  private void collectRuns(RandomAccessFile fIn) throws IOException {
    /* 데이터 파일 fIn에 등장하눈 모든 run 들과 각각의 등장횟수를 count하여 ArrayList runs에 저장한다 */
  }

  public static void main (String[] args) {
    HuffmanCoding app = new HuffmanCoding();
    RandomAccessFile fIn;

    try {
      fIn = new RandomAccessFile("sample.txt", "r");
      app.collectRuns(fIn);
      fIn.close();
    } catch (IOException io) {
      System.err.println("Cannot open " + fileName);
    }

  }
}
```

## Huffman Tree 구현

```java
class Run implements Comparable<Run> {
  public byte symbol;
  public int runLen;
  public int freq;

  /* 트리의 노드로 사용하기 위해 왼쪽 자식과 오른쪽 자식 노드 필드를 추가 */

  /* 두 run간의 크기관계를 비교하는 compareTo 메소드를 override(freq) */

}
```

```java
public class HuffmanCoding {
  private List<Run> runs = new ArrayList<>();

  private Heap<Run> heap;
  private Run theRoot = null;

  private void createHuffmanTree() {
    heap = new Heap<>();

    /* 
    1. 모든 runs를 순서대로 저장
    2. heap의 사이즈가 1보다 큰 동안
      1) pop 2회 수행
      2) 컴바인 트리 생성
      3) 컴바인 트리를 힙에 삽입
    3. theRoot를 트리의 root로 정의
     */
  }
}
```

## Codeword 부여하기



```java
private void assignCodeWords(Run p, int codeword, int length) {
  if (p.left == null && p.right == null) {
    p.codeword = codeword;
    p.codewordLen = length;
  } else {
    assignCodewords(p.left, codeword << + 1, length + 1);
    assignCodewords(p.right, codeword >> + 1, length + 1);
  }
}
```

```java
class Run implements Comparable<Run> {
  public byte symbol;
  public int runLen;
  public int freq;

  /* 트리의 노드로 사용하기 위해 왼쪽 자식과 오른쪽 자식 노드 필드를 추가 */

  /* 두 run간의 크기관계를 비교하는 compareTo 메소드를 override(freq) */

  public int codeword;
  public int codewordLen;

}
```

- Huffman 트리의 리프 노드에 위치한 run들에게 이진 codeword를 부여할 차례
- prefix를 하나의 32비트 정수로 표현
  - 하지만 32비트 중에서 하위 몇 비트만이 실제 부여된 codeword
  - codeword의 길이를 따로 유지해야 함

```java
public class HuffmanCoding {
  // ...

  public void compressFile(RandomAccessFile fIn) {
    collectRuns(fIn);
    createHuffmanTree();
    assignCodewords(theRoot, 0, 0);
  }

  public static void main (String[] args) {
    HuffmanCoding app = new HuffmanCoding();
    try (RandomAccessFile fIn = new RandomAccessFile("sample.txt", "r")) {
      app.compressFile(fIn);
    } catch (IOException io) {
      System.err.println("Cannot open " + fileName);
    }
  }
}
```

## 인코딩

- 데이터 파일을 압축하기 위해서는 데이터 파일을 다시 시작부터 읽으면서 run을 하나씩 인식한 후 해당 run에 부여된 codeword를 검색한다
- Huffman 트리에는 모든 run들이 리프노드에 위치하므로 검색하기 불편
- 검색하기 편리한 구조를 만들어야 함
- 압축파일의 맨 앞부분(header)에 파일을 구성하는 run들에 대한 정보를 기록
- 이때 원본 파일의 길이도 함께 기록


## Array of Linked Lists

- symbol이 동일한 run들을 하나의 연결리스트로 저장
- 각 run의 right 필드를 다음 노드를 가리키는 링크 필드로 사용


### storeRunsIntoArray

```java
private Run[] chars = new Run[256];

/* Huffman 트리의 모든 리프노드들을 chars에 recursion으로 저장 */
private void storeRunsIntoArray(Run p) {
  if (p.left == null && p.right == null) {
    insertToArray(p);  // 배열 chars[p.symbol]가 가리키는 연결리스트의 맨 앞에 p를 삽입
  } else {
    storeRunsIntoArray(p.left);
    storeRunsIntoArray(p.right);
  }
}

public void compressFile(RandomAccessFile fIn) {
  collectRuns(fIn);
  createHuffmanTree();
  assignCodewords(theRoot, 0, 0);
  storeRunsIntoArray(theRoot);
}
```

## Run 검색하기

- symbol과 runLength가 주어질 때 배열 chars를 검색하여 해당하는 run을 찾아 반환하는 메서드를 작성한다

```java
public Run findRun(byte symbol, int length) {
  /* 배열 chars에서 (symbol, length)에 해당하는 run을 찾아 반환 */
}
```

## outputFrequencies

```java
private void outputFrequencies(RandomAccessFile fIn, RandomAccessFile fOut) throws Exception {
  fOut.writeInt(runs.size());
  fOut.writeLong(fIn.getFilePointer());

  for (int j = 0; j < runs.size();  j++) {
    Run r = runs.get(j);
    fOut.write(r.symbol);
    fOut.writeInt(r.runLen);
    fOut.writeInt(r.freq);
  }
}
```

- run의 개수를 하나의 정수로 출력
- 원본 파일의 크기(byte단위)를 출력
- 각각의 run들을 출력


## compressFile

```java
public void compressFile(String inFilenName, RandomAccessFile fIn) throws IOException {
  String outFileName = new String(inFileName + ".z");

  RandomAccessFIle fOut = new RandomAccessFile(outFileName, "rw");

  collectRuns(fIn);
  outputFrequencies(fIn, fOut);
  createHuffmanTree();
  assignCodewords(theRoot, 0, 0);
  storeRunsIntoArray(theRoot);
  fIn.seek(0);
  encode(fIn, fOut);
}
```

## encode

```java
private void encode(RandomAccessFile fIn, RandomAccessFile fOUt) {
  while there remains bytes to read in the file {
    recognise a run;
    find the codeword for the run;
    pack the codeword into the buffer;
    if the buffer becomes full
      write the buffer into the compressed file;
  }

  if buffer is not empty {
    append 0s into the buffer;
    write the buffer into the compressed file;
  }
}
```

- encode를 위하여 하나의 buffer를 사용한다


## 디코딩

```java
public class HuffmanDecoder {
  public static void main (String[] args) {
    String fileName = "";
    HuffmanCoding app = new HuffmanCoding();
    RandomAccessFile fIn;

    Scanner kb = new Scanner(System.in);

    try {
      System.out.print("Enter a file name: ");
      fileName = kb.next();
      fIn = new RandomAccessFile(fileName, "r");
      app.decompressFile(fileName, fIn);
      fIn.close();
    } catch (IOException io) {
      System.err.println("Cannot open " + fileName);
    }
  }
}
```

## decompressFile

```java
public void decompressFile(String inFileName, RandomAccessFile fIn) throws IOException {
  String outFileName = new String(inFileName + ".dec");
  RandomAccessFile fOut = new RandomAccessFile(outFileName, "rw");

  inputFrequencies(fIn);
  createHuffmanTree();
  assignCodewords(theRoot, 0, 0);
  decode(fIn, fOut);
}
```

## inputFrequencies

```java
private void inputFrequencies(RandomAccessFile fIn) throws IOException {
  int dataIndex = fIn.readInt();
  charCnt = fIn.readLong();
  runs.ensureCapacity(dataIndex);

  for (int j = 0; j < dataIndex; j++) {
    Run r = new Run();
    r.symbol = (byte) fIn.read();
    r.runLen = fIn.readInt();
    r.freq = fIn.readInt();
    runs.add(r);
  }
}
```
