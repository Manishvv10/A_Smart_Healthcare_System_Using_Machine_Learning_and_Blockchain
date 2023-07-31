'''@Nishant Banjade'''

'''Breast cancer prediction'''

#import libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn import preprocessing
from sklearn import metrics
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import plot_confusion_matrix, accuracy_score, classification_report
import joblib

# load the dataset
data = pd.read_csv("data.csv")

### let's remove the column id and Unnamed:32
data = data.drop(['id','Unnamed: 32'],axis=1)
# selecting only the skewed columns to transform it in gaussian distribution
data_temp = data[['radius_mean', 'area_mean',
       'compactness_mean', 'concavity_mean', 'concave points_mean',
       'area_worst', 'compactness_worst',
       'concavity_worst', 'area_se','fractal_dimension_se',
         'symmetry_worst', 'fractal_dimension_worst']].copy()

#### Label encoding
label_encoder = preprocessing.LabelEncoder()
data['diagnosis'] = label_encoder.fit_transform(data['diagnosis'])
# label
y = data['diagnosis'].copy()

# standard scaler
scaler = StandardScaler()
data_temp = scaler.fit_transform(data_temp)


'''Train test split'''
X_train, X_test, y_train, y_test= train_test_split(data_temp, y, test_size = 0.2, random_state=42)


'''Logistic Regression'''

log = LogisticRegression()
log.fit(X_train, y_train)
# save the model
filename = 'breast_model.sav'
joblib.dump(log, filename)

#load the model 
loaded_model = joblib.load(filename)

X_test = scaler.fit_transform(X_test)
pred = loaded_model.predict(X_test)


