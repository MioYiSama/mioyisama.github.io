# Kaggle 深度学习笔记（双语）

[[toc]]

## 构建和使用模型

The steps to building and using a model are:

- **Define:** What type of model will it be? A decision tree? Some other type of model? Some other parameters of the model type are specified too.
- **Fit:** Capture patterns from provided data. This is the heart of modeling.
- **Predict:** Just what it sounds like
- **Evaluate**: Determine how accurate the model's predictions are.

构建和使用模型的步骤是：

- 定义：它将是什么类型的模型？决策树吗？还是其他类型的模型？模型类型的一些其他参数也会被指定。
- 拟合：从提供的数据中捕获模式。这是建模的核心。
- 预测：顾名思义
- 评估：确定模型预测的准确性。

## 什么是深度学习

**Deep learning** is an approach to machine learning characterized by deep stacks of computations. This depth of computation is what has enabled deep learning models to disentangle the kinds of complex and hierarchical patterns found in the most challenging real-world datasets.

深度学习是一种机器学习方法，其特点是具有深层的计算堆栈。这种计算的深度使得深度学习模型能够解析在最具挑战性的现实世界数据集中发现的复杂和分层模式。

Through their power and scalability **neural networks** have become the defining model of deep learning. Neural networks are composed of neurons, where each neuron individually performs only a simple computation. The power of a neural network comes instead from the complexity of the connections these neurons can form.

通过其强大的能力和可扩展性，神经网络已成为深度学习的代表性模型。神经网络由神经元组成，每个神经元单独执行的计算非常简单。神经网络的能力来自于这些神经元可以形成的连接的复杂性。

### 神经元

As a diagram, a **neuron** (or **unit**) with one input looks like:

用图表示，一个具有一个输入的神经元（或单元）看起来像：

![线性单元](https://storage.googleapis.com/kaggle-media/learn/images/mfOlDR6.png)

The input is `x`. Its connection to the neuron has a **weight** which is `w`. Whenever a value flows through a connection, you multiply the value by the connection's weight. For the input `x`, what reaches the neuron is `w * x`. A neural network "learns" by modifying its weights.

输入是 `x` 。它与神经元的连接有一个权重，该权重为 `w` 。每当一个值通过连接流动时，你将该值乘以连接的权重。对于输入 `x` ，到达神经元的是 `w * x` 。神经网络通过修改其权重来“学习”。

The `b` is a special kind of weight we call the **bias**. The bias doesn't have any input data associated with it; instead, we put a `1` in the diagram so that the value that reaches the neuron is just `b` (since `1 * b = b`). The bias enables the neuron to modify the output independently of its inputs.

`b` 是一种特殊的权重，我们称之为偏置。偏置没有任何关联的输入数据；相反，我们在图中放置一个 `1` ，这样到达神经元的值就只是 `b` （因为 `1 * b = b` ）。偏置使神经元能够独立于其输入来修改输出。

The `y` is the value the neuron ultimately outputs. To get the output, the neuron sums up all the values it receives through its connections. This neuron's activation is `y = w * x + b`, or as a formula $y = wx + b$.

`y` 是神经元最终输出的值。为了得到输出，神经元会将其通过连接接收到的所有值相加。这个神经元的激活是 `y = w * x + b` ，或者用公式表示为 $y=wx+b$。

### 多个输入

![Multiple Inputs](https://storage.googleapis.com/kaggle-media/learn/images/vyXSnlZ.png)

The formula for this neuron would be $y=w_0 x_0 + w_1 x_1 + w_2 x_2 + b$. A linear unit with two inputs will fit a plane, and a unit with more inputs than that will fit a hyperplane.

这个神经元的公式是 $y=w_0 x_0 + w_1 x_1 + w_2 x_2 + b$。具有两个输入的线性单元将拟合一个平面，而具有更多输入的单元将拟合一个超平面。

### 层

Neural networks typically organize their neurons into **layers**. When we collect together linear units having a common set of inputs we get a **dense** layer.

神经网络通常将其神经元组织成层。当我们把具有一组共同输入的线性单元收集在一起时，就得到了一个密集层。

![Layer](https://storage.googleapis.com/kaggle-media/learn/images/2MA4iMV.png)

### 激活函数

It turns out, however, that two dense layers with nothing in between are no better than a single dense layer by itself. Dense layers by themselves can never move us out of the world of lines and planes. What we need is something *nonlinear*. What we need are activation functions.

然而，事实证明，两个没有任何中间层的密集层并不比单个密集层更好。仅凭密集层本身永远无法让我们脱离线和平面的世界。我们需要的是非线性的东西。我们需要的是激活函数。

An **activation function** is simply some function we apply to each of a layer's outputs (its *activations*). The most common is the *rectifier* function $max(0,x)$.

激活函数只是我们应用于层的每个输出（其激活值）的一些函数。最常见的是整流函数 $max(0,x)$ 。

![ReFunction](https://storage.googleapis.com/kaggle-media/learn/images/aeIyAlF.png)

When we attach the rectifier to a linear unit, we get a **rectified linear unit** or **ReLU**. (For this reason, it's common to call the rectifier function the "ReLU function".) Applying a ReLU activation to a linear unit means the output becomes `max(0, w * x + b)`, which we might draw in a diagram like:

当我们把整流器连接到线性单元时，我们得到一个整流线性单元或 ReLU。（因此，通常称整流函数为“ReLU 函数”。）对线性单元应用 ReLU 激活意味着输出变为 `max(0, w * x + b)` ，我们可以在图中这样表示：

![ReLU](https://storage.googleapis.com/kaggle-media/learn/images/eFry7Yu.png)

### 堆叠密集层

Let's see how we can stack layers to get complex data transformations.

让我们看看如何堆叠层来实现复杂的数据转换。

![Fully Connected Network](https://storage.googleapis.com/kaggle-media/learn/images/Y5iwFQZ.png)

The layers before the output layer are sometimes called **hidden** since we never see their outputs directly.

输出层之前的层有时被称为隐藏层，因为它们的输出我们从来不会直接看到。

Now, notice that the final (output) layer is a linear unit (meaning, no activation function). That makes this network appropriate to a regression task, where we are trying to predict some arbitrary numeric value. Other tasks (like classification) might require an activation function on the output.

现在，注意最后一层（输出层）是一个线性单元（意味着没有激活函数）。这使得该网络适用于回归任务，我们试图预测某个任意数值。其他任务（如分类）可能需要在输出上使用激活函数。

## 训练神经网络

As with all machine learning tasks, we begin with a set of training data. Each example in the training data consists of some features (the inputs) together with an expected target (the output). Training the network means adjusting its weights in such a way that it can transform the features into the target. In the *80 Cereals* dataset, for instance, we want a network that can take each cereal's `'sugar'`, `'fiber'`, and `'protein'` content and produce a prediction for that cereal's `'calories'`. If we can successfully train a network to do that, its weights must represent in some way the relationship between those features and that target as expressed in the training data.

与所有机器学习任务一样，我们从一组训练数据开始。训练数据中的每个示例都包含一些特征（输入）以及一个预期的目标（输出）。训练网络意味着调整其权重，以便它可以将特征转换为目标。例如，在 80 种谷物数据集中，我们希望有一个网络能够接收每种谷物的 `'sugar'` 、 `'fiber'` 和 `'protein'` 含量，并对该谷物的 `'calories'` 进行预测。如果我们能够成功训练一个网络来做到这一点，那么它的权重必须以某种方式代表了训练数据中这些特征与目标之间的关系。

In addition to the training data, we need two more things:

- A "loss function" that measures how good the network's predictions are.
- An "optimizer" that can tell the network how to change its weights.

除了训练数据外，我们还需要两样东西：

- 一个“损失函数”，用于衡量网络预测的好坏。
- 一个可以告诉网络如何改变其权重的“优化器”。

### 损失函数

The **loss function** measures the disparity between the the target's true value and the value the model predicts.

损失函数衡量目标的真实值与模型预测值之间的差异。

A common loss function for regression problems is the **mean absolute error** or **MAE**. For each prediction `y_pred`, MAE measures the disparity from the true target `y_true` by an absolute difference `abs(y_true - y_pred)`.

回归问题中常用的损失函数是平均绝对误差或 MAE。对于每个预测 `y_pred` ，MAE 通过绝对差值 `abs(y_true - y_pred)` 来衡量其与真实目标 `y_true` 之间的差异。

The total MAE loss on a dataset is the mean of all these absolute differences.

数据集上的总 MAE 损失是所有这些绝对差值的平均值。

![MAE](https://storage.googleapis.com/kaggle-media/learn/images/VDcvkZN.png)

Besides MAE, other loss functions you might see for regression problems are the mean-squared error (MSE) or the Huber loss (both available in Keras).

除了 MAE 之外，你在回归问题中可能还会看到均方误差（MSE）或 Huber 损失（这两种在 Keras 中都可用）。

During training, the model will use the loss function as a guide for finding the correct values of its weights (lower loss is better). In other words, the loss function tells the network its objective.

在训练过程中，模型将使用损失函数作为寻找其权重正确值的指南（损失越低越好）。换句话说，损失函数告诉网络其目标。

### 优化器 —— 随机梯度下降 Stochastic Gradient Descent

We've described the problem we want the network to solve, but now we need to say *how* to solve it. This is the job of the **optimizer**. The optimizer is an algorithm that adjusts the weights to minimize the loss.

我们已经描述了我们希望网络解决的问题，但现在我们需要说明如何解决它。这是优化器的工作。优化器是一种算法，它通过调整权重来最小化损失。

Virtually all of the optimization algorithms used in deep learning belong to a family called **stochastic gradient descent**. They are iterative algorithms that train a network in steps. One **step** of training goes like this:

1. Sample some training data and run it through the network to make predictions.
2. Measure the loss between the predictions and the true values.
3. Finally, adjust the weights in a direction that makes the loss smaller.

实际上，深度学习中使用的所有优化算法都属于一个称为随机梯度下降的家族。它们是迭代算法，逐步训练网络。一次训练步骤如下：

1. 采样一些训练数据并将其输入网络以进行预测。
2. 测量预测值与真实值之间的损失。
3. 最后，调整权重，使其朝着使损失减小的方向变化。

Then just do this over and over until the loss is as small as you like (or until it won't decrease any further.)

然后就这样反复进行，直到损失降到你满意的程度（或者直到它不再进一步减少）。

Each iteration's sample of training data is called a **minibatch** (or often just "batch"), while a complete round of the training data is called an **epoch**. The number of epochs you train for is how many times the network will see each training example.

每次迭代的训练数据样本称为小批量（或通常简称为“批量”），而训练数据的完整一轮称为一个周期。你训练的周期数就是网络将看到每个训练样本的次数。

![Optimize](https://storage.googleapis.com/kaggle-media/learn/images/rFI1tIk.gif)

The animation shows the linear model from Lesson 1 being trained with SGD. The pale red dots depict the entire training set, while the solid red dots are the minibatches. Every time SGD sees a new minibatch, it will shift the weights (`w` the slope and `b` the y-intercept) toward their correct values on that batch. Batch after batch, the line eventually converges to its best fit. You can see that the loss gets smaller as the weights get closer to their true values.

动画展示了第 1 课中的线性模型使用 SGD 进行训练的过程。浅红色的点表示整个训练集，而实心红色的点是小批量。每当 SGD 看到一个新的小批量时，它会将权重（ `w` 斜率和 `b` y 截距）向该批量上的正确值调整。一批接一批，这条线最终收敛到最佳拟合。你可以看到，随着权重接近其真实值，损失变得越来越小。

### 学习率和批量大小

Notice that the line only makes a small shift in the direction of each batch (instead of moving all the way). The size of these shifts is determined by the **learning rate**. A smaller learning rate means the network needs to see more minibatches before its weights converge to their best values.

请注意，该行仅在每个批次的方向上做小幅调整（而不是一次性移动到位）。这些调整的大小由学习率决定。较小的学习率意味着网络需要看到更多的小批次，其权重才能收敛到最佳值。

The learning rate and the size of the minibatches are the two parameters that have the largest effect on how the SGD training proceeds. Their interaction is often subtle and the right choice for these parameters isn't always obvious. (We'll explore these effects in the exercise.)

学习率和小批量的大小是影响 SGD 训练过程的两个最重要的参数。它们之间的相互作用通常是微妙的，对于这些参数的正确选择并不总是显而易见的。（我们将在练习中探讨这些影响。）

Fortunately, for most work it won't be necessary to do an extensive hyperparameter search to get satisfactory results. **Adam** is an SGD algorithm that has an adaptive learning rate that makes it suitable for most problems without any parameter tuning (it is "self tuning", in a sense). Adam is a great general-purpose optimizer.

幸运的是，对于大多数工作来说，不需要进行广泛的超参数搜索就能获得满意的结果。Adam 是一种具有自适应学习率的 SGD 算法，这使得它在大多数问题上无需任何参数调整即可适用（在某种意义上它是“自调”的）。Adam 是一个很好的通用优化器。

## 过拟合和欠拟合

![fitting](https://storage.googleapis.com/kaggle-media/learn/images/eUF6mfo.png)

### 容量

A model's **capacity** refers to the size and complexity of the patterns it is able to learn. For neural networks, this will largely be determined by how many neurons it has and how they are connected together. If it appears that your network is underfitting the data, you should try increasing its capacity.

模型的容量指的是它能够学习的模式的大小和复杂性。对于神经网络来说，这主要取决于它有多少个神经元以及这些神经元是如何连接在一起的。如果看起来你的网络对数据欠拟合，你应该尝试增加其容量。

You can increase the capacity of a network either by making it *wider* (more units to existing layers) or by making it *deeper* (adding more layers). Wider networks have an easier time learning more linear relationships, while deeper networks prefer more nonlinear ones. Which is better just depends on the dataset.

你可以通过加宽网络（向现有层添加更多单元）或加深网络（添加更多层）来增加网络的容量。更宽的网络更容易学习更多的线性关系，而更深的网络则更倾向于非线性关系。哪个更好取决于数据集。

### 提前停止

![Early Stop](https://storage.googleapis.com/kaggle-media/learn/images/eP0gppr.png)

## 特殊层

### Dropout

In the last lesson we talked about how overfitting is caused by the network learning spurious patterns in the training data. To recognize these spurious patterns a network will often rely on very a specific combinations of weight, a kind of "conspiracy" of weights. Being so specific, they tend to be fragile: remove one and the conspiracy falls apart.

在上一课中，我们讨论了过拟合是如何由网络学习训练数据中的虚假模式引起的。为了识别这些虚假模式，网络通常会依赖于非常特定的权重组合，这是一种权重的“共谋”。由于这种组合非常具体，它们往往很脆弱：去掉一个，整个共谋就会瓦解。

This is the idea behind **dropout**. To break up these conspiracies, we randomly *drop out* some fraction of a layer's input units every step of training, making it much harder for the network to learn those spurious patterns in the training data. Instead, it has to search for broad, general patterns, whose weight patterns tend to be more robust.

这是 dropout 背后的想法。为了打破这些共谋，我们在每次训练中随机丢弃一层输入单元的一部分，使得网络更难学习训练数据中的那些虚假模式。相反，它必须寻找广泛、一般的模式，这些模式的权重通常更稳健。

![Dropout](https://storage.googleapis.com/kaggle-media/learn/images/a86utxY.gif)

You could also think about dropout as creating a kind of *ensemble* of networks. The predictions will no longer be made by one big network, but instead by a committee of smaller networks. Individuals in the committee tend to make different kinds of mistakes, but be right at the same time, making the committee as a whole better than any individual. (If you're familiar with random forests as an ensemble of decision trees, it's the same idea.)

你也可以将 dropout 视为创建了一种网络的集成。预测将不再由一个大型网络完成，而是由一组较小的网络组成的委员会来完成。委员会中的各个成员往往会犯不同类型的错误，但同时也会正确，这使得整个委员会比任何一个个体都要好。（如果你熟悉作为决策树集成的随机森林，那就是同样的想法。）

### Batch Normalization

The next special layer we'll look at performs "batch normalization" (or "batchnorm"), which can help correct training that is slow or unstable.

我们将要看的下一个特殊层执行“批量归一化”（或“批归一化”），这可以帮助纠正训练缓慢或不稳定的问题。

With neural networks, it's generally a good idea to put all of your data on a common scale, perhaps with something like scikit-learn's [StandardScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html) or [MinMaxScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MinMaxScaler.html). The reason is that SGD will shift the network weights in proportion to how large an activation the data produces. Features that tend to produce activations of very different sizes can make for unstable training behavior.

在神经网络中，通常将所有数据放在一个共同的尺度上是一个好主意，也许可以使用像 scikit-learn 的 StandardScaler 或 MinMaxScaler 这样的工具。原因是 SGD 会根据数据产生的激活大小按比例调整网络权重。那些倾向于产生大小非常不同的激活的特征可能会导致训练行为不稳定。

Now, if it's good to normalize the data before it goes into the network, maybe also normalizing inside the network would be better! In fact, we have a special kind of layer that can do this, the **batch normalization layer**. A batch normalization layer looks at each batch as it comes in, first normalizing the batch with its own mean and standard deviation, and then also putting the data on a new scale with two trainable rescaling parameters. Batchnorm, in effect, performs a kind of coordinated rescaling of its inputs.

现在，如果在数据进入网络之前进行归一化是好的，那么也许在网络内部也进行归一化会更好！事实上，我们有一种特殊的层可以做到这一点，即批量归一化层。批量归一化层在每个批次进来时查看该批次，首先使用该批次自己的均值和标准差对批次进行归一化，然后还通过两个可训练的重缩放参数将数据放在新的尺度上。批量归一化实际上对其输入执行了一种协调的重缩放。

Most often, batchnorm is added as an aid to the optimization process (though it can sometimes also help prediction performance). Models with batchnorm tend to need fewer epochs to complete training. Moreover, batchnorm can also fix various problems that can cause the training to get "stuck". Consider adding batch normalization to your models, especially if you're having trouble during training.

最常见的是，批量归一化被添加为优化过程的辅助（尽管它有时也可以帮助提高预测性能）。带有批量归一化的模型往往需要较少的训练周期来完成训练。此外，批量归一化还可以解决各种可能导致训练“卡住”的问题。考虑在你的模型中添加批量归一化，特别是在训练过程中遇到困难时。

## 分类

### 准确率和交叉熵

**Accuracy** is one of the many metrics in use for measuring success on a classification problem. Accuracy is the ratio of correct predictions to total predictions: `accuracy = number_correct / total`. A model that always predicted correctly would have an accuracy score of `1.0`. All else being equal, accuracy is a reasonable metric to use whenever the classes in the dataset occur with about the same frequency.

准确率是用于衡量分类问题成功与否的众多指标之一。准确率是正确预测与总预测数的比例： `accuracy = number_correct / total` 。一个总是预测正确的模型将具有 `1.0` 的准确率分数。在其他条件相同的情况下，当数据集中的类别出现频率大致相同时，准确率是一个合理的度量指标。

The problem with accuracy (and most other classification metrics) is that it can't be used as a loss function. SGD needs a loss function that changes smoothly, but accuracy, being a ratio of counts, changes in "jumps". So, we have to choose a substitute to act as the loss function. This substitute is the *cross-entropy* function.

准确率（以及大多数其他分类指标）的问题在于它不能用作损失函数。SGD 需要一个平滑变化的损失函数，但准确率作为一个计数的比率，是跳跃式变化的。因此，我们必须选择一个替代品来充当损失函数。这个替代品就是交叉熵函数。

Now, recall that the loss function defines the *objective* of the network during training. With regression, our goal was to minimize the distance between the expected outcome and the predicted outcome. We chose MAE to measure this distance.

现在，回想一下损失函数在训练过程中定义了网络的目标。在回归中，我们的目标是尽量减小预期结果和预测结果之间的距离。我们选择了 MAE 来衡量这个距离。

For classification, what we want instead is a distance between *probabilities*, and this is what cross-entropy provides. **Cross-entropy** is a sort of measure for the distance from one probability distribution to another.

对于分类，我们想要的是一种概率之间的距离，而这正是交叉熵所提供的。交叉熵是一种衡量从一个概率分布到另一个概率分布的距离的度量。

### Sigmoid 函数

The cross-entropy and accuracy functions both require probabilities as inputs, meaning, numbers from 0 to 1. To covert the real-valued outputs produced by a dense layer into probabilities, we attach a new kind of activation function, the **sigmoid activation**.

交叉熵和准确率函数都需要概率作为输入，也就是说，0 到 1 之间的数字。为了将密集层产生的实数值输出转换为概率，我们附加一种新的激活函数，即 Sigmoid 激活函数。

![sigmoid](https://storage.googleapis.com/kaggle-media/learn/images/FYbRvJo.png)

To get the final class prediction, we define a *threshold* probability. Typically this will be 0.5, so that rounding will give us the correct class: below 0.5 means the class with label 0 and 0.5 or above means the class with label 1. A 0.5 threshold is what Keras uses by default with its [accuracy metric](https://www.tensorflow.org/api_docs/python/tf/keras/metrics/BinaryAccuracy).

为了得到最终的类别预测，我们定义一个阈值概率。通常这个阈值为 0.5，这样四舍五入会给我们正确的类别：低于 0.5 意味着标签为 0 的类别，0.5 或以上意味着标签为 1 的类别。0.5 的阈值是 Keras 在其准确率指标中默认使用的。

