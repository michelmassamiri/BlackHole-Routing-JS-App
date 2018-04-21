'''
Debian9 image directory path
'''
iso_dir=""

'''
Export virtual HD directory path
'''
dst_dir = ""



InitNemu()

VHost('debian', 
 hds=[EmptyFs(dst_dir + "debian9lxde.img", size='10G', type='raw', format='ext3')], 
 nics=[VNic()], cdrom=iso_dir +"debian-live-9.3.0-i386-lxde.iso", display="sdl", vga="std",
 enable_kvm=None, localtime=None, k='fr', m=1024, cpu='core2duo')
 
VSlirp('slirp', net='192.168.0.0/24')
 
Link('debian', 'slirp')
 
StartNemu()
 
WaitNemu('debian')
 
StopNemu()
 
ExportFs(dst_dir + "debian9lxde.img")
 
DelNemu()
