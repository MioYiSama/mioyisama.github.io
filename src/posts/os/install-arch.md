# Arch Linux 安装

## 硬盘

```bash
# 分区
cfdisk /dev/...

# 格式化
mkswap /dev/...
mkfs.ext4 /dev/...

# 挂载
mount /dev/... /mnt
swapon /dev/...

# fstab 文件允许系统在启动时自动挂载指定的文件系统
genfstab -U /mnt >> /mnt/etc/fstab
```

## 安装包

```bash
# 更新镜像源
reflector --country China --protocol https --sort rate --save /etc/pacman.d/mirrorlist

# 安装包
pacstrap /mnt base base-devel linux linux-firmware
```

## 设置

1. 进入系统

```bash
arch-chroot /mnt
```

2. 时区

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc
```

3. 本地化

```bash
pacman -S nano

nano /etc/locale.gen
# 取消注释 en_US.UTF-8 和 zh_CN.UTF-8 行

locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

4. 主机名

```bash
echo "archlinux" > /etc/hostname
```

5. hosts

```bash
echo "127.0.0.1 localhost" > /etc/hosts
echo "::1       localhost" >> /etc/hosts
echo "127.0.1.1 archlinux.localdomain archlinux" >> /etc/hosts
```

6. 用户

```bash
# 设置 root 密码
passwd

# 安装 sudo
pacman -S sudo

# 创建用户
useradd -m -G wheel -s /bin/bash <用户名>
passwd <用户名>

# 配置 sudo
EDITOR=nano visudo
# 取消注释 %wheel ALL=(ALL:ALL) ALL
```

7. 网络

```bash
pacman -S networkmanager
systemctl enable NetworkManager
```

8. 安装桌面环境

```bash
# 安装基本 KDE Plasma 环境
pacman -S plasma-meta

# 安装文件管理、终端、压缩软件
pacman -S dolphin konsole ark

# 安装 Wayland 相关包
pacman -S plasma-wayland-session

# 安装 SDDM (KDE 推荐的显示管理器)
pacman -S sddm
systemctl enable sddm.service
```

9. 安装驱动

```bash
pacman -S intel-ucode

# 安装 NVIDIA 驱动
pacman -S nvidia nvidia-utils nvidia-settings

# 加载 NVIDIA 驱动
nano /etc/mkinitcpio.conf
# 修改为：MODULES=(nvidia nvidia_modeset nvidia_uvm nvidia_drm)
mkinitcpio -P
```

## 重启

```bash
# 退出 chroot 环境
exit

# 卸载分区
umount -R /mnt

# 重启系统
reboot
```

## 进一步配置

```bash
# 安装基本声音驱动 (ALSA)
sudo pacman -S alsa-utils alsa-firmware alsa-plugins
# 声音服务器
sudo pacman -S pipewire pipewire-alsa pipewire-pulse pipewire-jack wireplumber

sudo usermod -aG audio $(whoami)

systemctl --user enable --now pipewire.service
systemctl --user enable --now pipewire-pulse.service
systemctl --user enable --now wireplumber.service
```