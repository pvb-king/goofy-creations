import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_curve, auc
from imblearn.over_sampling import SMOTE


df = pd.read_csv(r"C:\Users\bharg\OneDrive\Desktop\dataset_heart.csv")
print(df.head())


#remove missing values
df = df.dropna()

print("Missing values:\n", df.isnull().sum())

# Renamin 'heart disease' column to 'target' 
df.rename(columns={"heart disease": "target"}, inplace=True)

# convert it to binary: 0 (no disease), 1 (has disease)
df["target"] = (df["target"] > 1).astype(int)


# Split features and target
X = df.drop("target", axis=1)  # Replace 'target' with actual target column
y = df["target"]
#---------------------------------------------------------------------------------------------------------------------------------------
# Scaling the features for easyneszs
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.3, random_state=42, stratify=y
)

rf = RandomForestClassifier(random_state=42)
rf.fit(X_train, y_train)
y_pred_rf = rf.predict(X_test)

svm = SVC(probability=True, random_state=42)
svm.fit(X_train, y_train)
y_pred_svm = svm.predict(X_test)

def evaluate_model(y_true, y_pred, model_name):
    print(f"\n--- {model_name} ---")
    print("Accuracy:", round(accuracy_score(y_true, y_pred)*100,2),"%")
    print("Classification Report:\n", classification_report(y_true, y_pred))
    cm = confusion_matrix(y_true, y_pred)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title(f"Confusion Matrix: {model_name}")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.show()

evaluate_model(y_test, y_pred_rf, "Random Forest")
evaluate_model(y_test, y_pred_svm, "SVM")

y_proba_rf = rf.predict_proba(X_test)[:, 1]
y_proba_svm = svm.predict_proba(X_test)[:, 1]





# Human-readable statement predictions from Random Forest for first 10 predictions
print("\n--- Patient Predictions (Random Forest) ---")
for i in range(10): 
    prob = y_proba_rf[i]
    label = y_pred_rf[i]
    statement = "likely to have heart disease." if label == 1 else "not likely to have heart disease."
    print(f"Patient {i+1}: Predicted = {label} ({prob:.2f} probability) → {statement}")


print("\n--- Patient Predictions (SVM) ---")
for i in range(10):
    prob = y_proba_svm[i]
    label = y_pred_svm[i]
    statement = "likely to have heart disease." if label == 1 else "not likely to have heart disease."
    print(f"Patient {i+1}: Predicted = {label} ({prob:.2f} probability) → {statement}")


print("Number of features :",X.shape[1])
