
# include<unordered_map>
# include<vector>
using namespace std;

class Leaderboard {
public:
    unordered_map<int, int> id_to_scores;
    vector<int> scores;
    bool inputDataUnchanged;

    Leaderboard() {
        inputDataUnchanged = false;
    }

    void addScore(int playerId, int score) {
        if (id_to_scores.find(playerId) == id_to_scores.end()) {
            id_to_scores[playerId] = score;
        } else {
            id_to_scores[playerId] = id_to_scores[playerId] + score;
        }
        inputDataUnchanged = false;
    }

    int top(int K) {
        if (inputDataUnchanged == false) {
            scores.clear();
            for (auto& score : id_to_scores) {
                scores.push_back(score.second);
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

    void quickSelect(int left, int right, int K) {

        int pivotIndex = left + (right - left) / 2;
        pivotIndex = partition(left, right, pivotIndex);

        if (pivotIndex < K) {
            quickSelect(pivotIndex + 1, right, K);
        } else if (pivotIndex > K) {
            quickSelect(left, pivotIndex - 1, K);
        }
    }

    int partition(int left, int right, int pivotIndex) {

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

    void swap(int first, int second) {
        int temp = scores[first];
        scores[first] = scores[second];
        scores[second] = temp;
    }

    void reset(int playerId) {
        id_to_scores.erase(playerId);
        inputDataUnchanged = false;
    }
};
