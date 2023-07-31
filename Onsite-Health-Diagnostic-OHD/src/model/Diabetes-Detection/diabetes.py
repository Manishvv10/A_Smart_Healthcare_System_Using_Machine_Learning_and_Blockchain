'''Nishant Banjade'''
'''Heart Failure prediction
'''
# import the libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import missingno as msno
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import mean_squared_error
from sklearn import metrics
from sklearn.metrics import plot_confusion_matrix, accuracy_score, classification_report
import joblib

# read the dataset
data = pd.read_csv("diabetes.csv")

# Remove outlier
Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3 - Q1


# remove the outlier

data = data[~((data < (Q1 - 1.5 * IQR)) | (data > (Q3 + 1.5 * IQR))).any(axis = 1)]

# prepare the data
y = data["Outcome"].copy()
X = data.drop("Outcome",axis=1)

'''Train test split'''

X_train, X_test , y_train, y_test = train_test_split(X , y, test_size = 0.2, random_state = 42)

rf = RandomForestClassifier().fit(X_train,y_train)

# save and load model

filename = 'diabetes.sav'

joblib.dump(rf, filename)


