import itertools
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import cross_val_predict
from sklearn.model_selection import KFold
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
import numpy as np
import matplotlib.pyplot as plt


def plot_confusion_matrix(cm,
                          classes,
                          normalize=False,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues):
    """
    This function prints and plots the confusion matrix.
    Normalization can be applied by setting `normalize=True`.
    """
    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
        print("Normalized confusion matrix")
    else:
        print('Confusion matrix, without normalization')

    print(cm)

    plt.style.use('seaborn')

    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)

    fmt = '.2f' if normalize else 'd'
    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j,
                 i,
                 format(cm[i, j], fmt),
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')


I = load_iris()
X1, X2, t1, t2 = train_test_split(I.data,
                                  I.target,
                                  test_size=0.3,
                                  stratify=I.target)

class_names = I.target_names

print(t2.shape)
print(t2)

print(np.sum(t2 == 0))
print(np.sum(t2 == 1))
print(np.sum(t2 == 2))

# lg = LogisticRegression(random_state=0, solver='lbfgs', multi_class='multinomial').fit(X1, t1)
# print(lg.score(X2, t2))
# print(lg.predict(X2))

# print(lg.fit(X1, t1))
# print(lg.score(X2, t2))

# print(np.sum(t2 == 0))
# print(np.sum(t2 == 1))
# print(np.sum(t2 == 2))

# X1, X2, t1, t2 = train_test_split(I.data, I.target, test_size=0.3, stratify=I.target, random_state=0)

# lg = LogisticRegression().fit(X1, t1)
# print(lg.score(X2, t2))
# print(lg.predict(X2))

# print(lg.fit(X1, t1))
# print(lg.score(X2, t2))

# print(np.sum(t2==0))
# print(np.sum(t2==1))
# print(np.sum(t2==2))

# lg = LogisticRegression()
# sc = cross_val_score(lg, I.data, I.target, cv=5)
# print(sc)
# sc = cross_val_score(lg, I.data, I.target, cv=4)
# print(sc)
# sc = cross_val_score(lg, I.data, I.target, cv=3)
# print(sc)
# rc = cross_val_predict(lg, I.data, I.target)
# print(rc)

# print('Confusion Matrix: \n' + str(confusion_matrix(I.target, rc)))

# GT = I.target
# print(sum(rc[GT==0]))

lg = LogisticRegression(random_state=0,
                        solver='lbfgs',
                        multi_class='multinomial')
kf = KFold(n_splits=4)
sc = cross_val_score(lg, I.data, I.target, cv=kf)
print(sc)

kf = KFold(n_splits=3)
sc = cross_val_score(lg, I.data, I.target, cv=kf)
print(sc)

kf = StratifiedKFold(n_splits=4)
sc = cross_val_score(lg, I.data, I.target, cv=kf)
print(sc)

kf = StratifiedKFold(n_splits=3)
sc = cross_val_score(lg, I.data, I.target, cv=kf)
print(sc)

rc = cross_val_predict(lg, I.data, I.target)
print(rc)

print('Confusion Matrix: \n' + str(confusion_matrix(I.target, rc)))
print(accuracy_score(I.target, rc))  # probabilidade total de acerto
print(1 - np.sum(I.target != rc) / 150.)  # probabilidade total de acerto

# Compute confusion matrix
cnf_matrix = confusion_matrix(I.target, rc)
np.set_printoptions(precision=2)

# Plot non-normalized confusion matrix
plt.figure()
plot_confusion_matrix(cnf_matrix,
                      classes=class_names,
                      title='Confusion matrix, without normalization')

# Plot normalized confusion matrix
plt.figure()
plot_confusion_matrix(cnf_matrix,
                      classes=class_names,
                      normalize=True,
                      title='Normalized confusion matrix')

plt.show()
