
# Thyroid Disease Detection End to End Deployment

Thyroid disease a very common problem in India, more than one crore people are suffering with the disease every year. Thyroid disorder can speed up or slow down the metabolism of the body.

The main objective of this project is to predict if a person is having hypothyroid, hyperthyroid, or negative (no thyroid) with the help of Machine Learning. Classification algorithms such as Logistic regression, Random Forest, Decision Tree, Naïve Bayes, Support Vector Machine have been trained on the thyroid dataset, UCI Machine Learning repository. Random Forest performed well with better accuracy (96.6%), precision and recall. After that, application has deployed on Heroku with the help of flask.

# Website Link (Thyroid Disease Detection)

https://thyroid-classification.herokuapp.com/

# Demo Link

https://github.com/ahmadtaquee/thyroid-classification-end_to_end-deployment/blob/main/Docs/Thyroid-Disease-Detection-Demo.mp4

# Technical aspect

- Python 3.7
- Front-end: HTML, CSS, Bootstrap
- Back-end: Flask framework
- IDE: Jupyter Notebook, PyCharm
- Database: MongoDB Atlas
- Deployment: Heroku

# How to run this app?

Code is written in Python 3.7. If you don't have python installed on your system, click here https://www.python.org/downloads/ to install.

- Create virtual environment: conda create -n myenv python=3.7
- Activate the environment: conda activate myenv
- Install the packages: pip install -r requirements.txt
- Run the app: python main.py

# Data Collection

The dataset is collected from UCI Machine Learning Repository, "Thyroid Disease Detection"

# Model Creation and Evaluation

- Various classification algorithms like Logistic Regression, Random Forest, Decision Tree, Naïve Bayes, Support Vector Machine tested.
- Random Forest, Decision Tree and Logistic regression were given better results. Random Forest was chosen for the final model training and testing.
- Model performance evaluated based on accuracy, confusion matrix, classification report.

# Database Connection

MongoDB Atlas database used for this project

# Model Deployment

The final model is deployed on Heroku using Flask framework


### Don't forget to Starred the repository.
