'''Nishant Banjade'''
'''Heart Failure prediction model '''
'''Refer jupyter notebook for EDA'''
# import the libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import plot_confusion_matrix, accuracy_score, classification_report
from sklearn import metrics
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
import joblib

# load the data
data = pd.read_csv("heart.csv")

'''LabelEncoder'''
labelencoder = LabelEncoder()
data["Sex"] = labelencoder.fit_transform(data["Sex"])

data["ChestPainType"] = labelencoder.fit_transform(data["ChestPainType"])
data["RestingECG"] = labelencoder.fit_transform(data["RestingECG"])
data["ExerciseAngina"] = labelencoder.fit_transform(data["ExerciseAngina"])
data["ST_Slope"] = labelencoder.fit_transform(data["ST_Slope"])

#### Remove the outlier
Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3-Q1

data = data[~((data < (Q1 - 1.5 * IQR)) | (data > (Q3 + 1.5 * IQR))).any(axis = 1)]

'''Prepare the dataset'''

label = data["HeartDisease"].copy()
data = data.drop("HeartDisease",axis=1)

'''Train test split'''
X_train, X_test, y_train, y_test = train_test_split(data, label, test_size = 0.2, random_state = 42)

scale = StandardScaler()
X_train = scale.fit_transform(X_train)
X_test = scale.fit_transform(X_test)

'''Decision Tree Model'''

mdl = DecisionTreeClassifier(criterion="entropy", max_depth=6)
mdl.fit(X_train,y_train)

# save the model
heart_file = 'heart_model.sav'
joblib.dump(mdl, heart_file)

load_model = joblib.load(heart_file)
y_p = load_model.predict(X_test)

print(y_p)
print()
print(y_test)

