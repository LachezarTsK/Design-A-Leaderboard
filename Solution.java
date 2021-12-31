
import java.util.Map;
import java.util.HashMap;

public class Leaderboard {

    Map<Integer, Integer> id_to_scores;
    int[] scores;
    boolean inputDataUnchanged;

    public Leaderboard() {
        id_to_scores = new HashMap<>();
    }

    public void addScore(int playerId, int score) {
        id_to_scores.put(playerId, id_to_scores.getOrDefault(playerId, 0) + score);
        inputDataUnchanged = false;
    }

    public int top(int K) {
        if (inputDataUnchanged == false) {
            scores = new int[id_to_scores.size()];
            int index = 0;
            for (int score : id_to_scores.values()) {
                scores[index++] = score;
            }
        }
        quickSelect(0, id_to_scores.size() - 1, K);

        int topK_scores = 0;
        for (int i = 0; i < K; i++) {
            topK_scores += scores[i];
        }

        inputDataUnchanged = true;
        return topK_scores;
    }

    public void quickSelect(int left, int right, int K) {

        int pivotIndex = left + (right - left) / 2;
        pivotIndex = partition(left, right, pivotIndex);

        if (pivotIndex < K) {
            quickSelect(pivotIndex + 1, right, K);
        } else if (pivotIndex > K) {
            quickSelect(left, pivotIndex - 1, K);
        }
    }

    public int partition(int left, int right, int pivotIndex) {

        int pivotValue = scores[pivotIndex];
        swap(right, pivotIndex);
        pivotIndex = left;

        for (int i = left; i < right; i++) {
            if (scores[i] >= pivotValue) {
                swap(i, pivotIndex);
                pivotIndex++;
            }
        }
        swap(right, pivotIndex);
        return pivotIndex;
    }

    public void swap(int first, int second) {
        int temp = scores[first];
        scores[first] = scores[second];
        scores[second] = temp;
    }

    public void reset(int playerId) {
        id_to_scores.remove(playerId);
        inputDataUnchanged = false;
    }
}
